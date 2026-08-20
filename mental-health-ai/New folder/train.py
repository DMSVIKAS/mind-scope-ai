import os, warnings, time
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)
from imblearn.over_sampling import SMOTE
import joblib

import xgboost as xgb
import lightgbm as lgb

from preprocess import (
    clean_text, load_and_preprocess, get_tfidf_vectorizer,
    encode_labels, save_artifacts
)

warnings.filterwarnings('ignore')
sns.set_style('whitegrid')
plt.rcParams['figure.dpi'] = 120


def evaluate_model(model, X_test, y_test, label_encoder=None, model_name="Model", X_test_raw=None):
    y_pred = model.predict(X_test)
    has_proba = hasattr(model, "predict_proba")
    acc = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)
    cm = confusion_matrix(y_test, y_pred)
    n_classes = len(np.unique(y_test))

    print(f"\n{'=' * 60}")
    print(f"  {model_name}")
    print(f"{'=' * 60}")
    print(f"  Accuracy :  {acc:.4f}")
    print(f"  Precision:  {precision:.4f}")
    print(f"  Recall   :  {recall:.4f}")
    print(f"  F1 Score :  {f1:.4f}")
    print(f"\n  Classification Report:")
    target_names = label_encoder.classes_ if label_encoder else None
    print(classification_report(y_test, y_pred, target_names=target_names))

    roc_auc_val = None
    if has_proba:
        proba = model.predict_proba(X_test)
        try:
            if n_classes == 2:
                roc_auc_val = roc_auc_score(y_test, proba[:, 1])
                print(f"  ROC-AUC  :  {roc_auc_val:.4f}")
            else:
                roc_auc_val = roc_auc_score(y_test, proba, multi_class='ovr')
                print(f"  ROC-AUC (OVR):  {roc_auc_val:.4f}")
        except Exception:
            pass

    return {
        "Model": model_name, "Accuracy": acc, "Precision": precision,
        "Recall": recall, "F1": f1, "y_pred": y_pred, "y_test": y_test,
        "cm": cm, "model": model, "roc_auc": roc_auc_val
    }


def plot_confusion_matrices(results, label_encoder=None):
    n = len(results)
    fig, axes = plt.subplots(1, n, figsize=(6 * n, 5))
    if n == 1:
        axes = [axes]
    n_classes = len(label_encoder.classes_) if label_encoder else len(np.unique(results[0]["y_test"]))
    classes = label_encoder.classes_ if label_encoder else [str(i) for i in range(n_classes)]
    for ax, res in zip(axes, results):
        sns.heatmap(res["cm"], annot=True, fmt='d', cmap='Blues', ax=ax,
                    xticklabels=classes, yticklabels=classes)
        ax.set_title(f"{res['Model']}  (Acc: {res['Accuracy']:.3f})")
        ax.set_xlabel("Predicted")
        ax.set_ylabel("Actual")
    plt.tight_layout()
    plt.savefig("results/confusion_matrix.png")
    plt.close()
    print("\n[+] Confusion matrices saved -> results/confusion_matrix.png")


def plot_accuracy_comparison(metrics_df):
    df_sorted = metrics_df.sort_values("Accuracy", ascending=True)
    plt.figure(figsize=(10, 6))
    colors = sns.color_palette("viridis", len(df_sorted))
    bars = plt.barh(df_sorted["Model"], df_sorted["Accuracy"], color=colors)
    for bar, val in zip(bars, df_sorted["Accuracy"]):
        plt.text(bar.get_width() + 0.003, bar.get_y() + bar.get_height() / 2,
                 f"{val:.4f}", va='center', fontsize=10)
    plt.xlabel("Accuracy")
    plt.title("Model Accuracy Comparison")
    plt.tight_layout()
    plt.savefig("results/model_accuracy.png")
    plt.close()
    print("[+] Accuracy comparison saved -> results/model_accuracy.png")


def plot_feature_importance(model, vectorizer, model_name, top_n=20):
    if hasattr(model, 'feature_importances_'):
        importances = model.feature_importances_
    elif hasattr(model, 'coef_'):
        if model.coef_.ndim > 1:
            importances = np.abs(model.coef_).mean(axis=0)
        else:
            importances = np.abs(model.coef_)
    else:
        return

    feature_names = vectorizer.get_feature_names_out()
    sorted_idx = np.argsort(importances)[::-1][:top_n]
    plt.figure(figsize=(10, 6))
    plt.barh(range(top_n), importances[sorted_idx][::-1], color='steelblue')
    plt.yticks(range(top_n), [feature_names[i] for i in sorted_idx][::-1])
    plt.xlabel("Importance")
    plt.title(f"Top {top_n} Features - {model_name}")
    plt.tight_layout()
    safe_name = model_name.replace(" ", "_").replace("(", "").replace(")", "").lower()
    plt.savefig(f"results/feature_importance_{safe_name}.png")
    plt.close()
    print(f"[+] Feature importance saved -> results/feature_importance_{safe_name}.png")


def plot_roc_curves(results, label_encoder):
    from sklearn.metrics import RocCurveDisplay
    fig, axes = plt.subplots(1, len(results), figsize=(6 * len(results), 5))
    if len(results) == 1:
        axes = [axes]
    for ax, res in zip(axes, results):
        model = res["model"]
        if hasattr(model, "predict_proba"):
            RocCurveDisplay.from_estimator(model, res.get("X_test_raw", res["X_test"]),
                                           res["y_test"], ax=ax)
            auc_str = f" (AUC={res.get('roc_auc', '?'):.3f})" if res.get('roc_auc') else ""
            ax.set_title(f"ROC{auc_str} - {res['Model']}")
    plt.tight_layout()
    plt.savefig("results/roc_curves.png")
    plt.close()
    print("[+] ROC curves saved -> results/roc_curves.png")


def run_gridsearch(estimator, param_grid, X_train, y_train, X_test, y_test,
                   label_encoder, model_name, n_jobs=-1):
    print(f"\n{'=' * 60}")
    print(f"  Training: {model_name}")
    print(f"{'=' * 60}")
    start = time.time()
    try:
        gs = GridSearchCV(estimator, param_grid, cv=5, scoring='accuracy',
                          n_jobs=n_jobs, verbose=0)
        gs.fit(X_train, y_train)
        elapsed = time.time() - start
        print(f"    Best params: {gs.best_params_}")
        print(f"    CV accuracy: {gs.best_score_:.4f}  |  Time: {elapsed:.1f}s")
        model = gs.best_estimator_
        res = evaluate_model(model, X_test, y_test, label_encoder,
                             f"{model_name} (GridSearch)")
        res["X_test"] = X_test
        return res, model
    except Exception as e:
        print(f"    [ERROR] {model_name} failed: {e}")
        return None, None


def main():
    total_start = time.time()
    print("=" * 60)
    print("  Sentiment Analysis - Training Pipeline")
    print("=" * 60)

    df, text_col, label_col = load_and_preprocess("Combined Data.csv")
    if 'Unnamed: 0' in df.columns:
        df = df.drop(columns=['Unnamed: 0'])

    print("[*] Cleaning text...")
    df['cleaned'] = df[text_col].apply(clean_text)
    df = df[df['cleaned'].str.len() > 0].reset_index(drop=True)
    print(f"    Rows after cleaning: {len(df)}")

    y, label_encoder = encode_labels(df[label_col])
    classes = label_encoder.classes_
    print(f"    Classes ({len(classes)}): {list(classes)}")

    X_train, X_test, y_train, y_test = train_test_split(
        df['cleaned'], y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"    Train: {len(X_train)} | Test: {len(X_test)}")

    vectorizer = get_tfidf_vectorizer()
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    print(f"    TF-IDF shape: {X_train_vec.shape}")

    class_counts = pd.Series(y_train).value_counts()
    imbalance_ratio = class_counts.max() / class_counts.min()
    apply_smote = imbalance_ratio > 2.0
    if apply_smote:
        print(f"[*] Imbalance ratio: {imbalance_ratio:.1f} - applying SMOTE...")
        smote = SMOTE(random_state=42)
        X_train_vec, y_train = smote.fit_resample(X_train_vec, y_train)
        print(f"    After SMOTE: {X_train_vec.shape}")
    else:
        print(f"[*] Imbalance ratio: {imbalance_ratio:.1f} - no SMOTE needed")

    # ================================================================
    #  Model definitions with hyperparameter grids
    # ================================================================
    models = [
        {
            "name": "Logistic Regression",
            "estimator": LogisticRegression(random_state=42, n_jobs=-1, max_iter=1000),
            "params": {
                "C": [0.1, 1, 10],
                "solver": ["liblinear"],
                "class_weight": [None, "balanced"]
            }
        },
        {
            "name": "SVM",
            "estimator": SVC(random_state=42, probability=True),
            "params": {
                "C": [0.1, 1, 10],
                "kernel": ["linear"],
                "gamma": ["scale"]
            }
        },
        {
            "name": "Random Forest",
            "estimator": RandomForestClassifier(random_state=42, n_jobs=-1),
            "params": {
                "n_estimators": [100, 200, 300],
                "max_depth": [None, 20, 40],
                "min_samples_split": [2, 5],
                "class_weight": [None, "balanced"]
            }
        },
        {
            "name": "XGBoost",
            "estimator": xgb.XGBClassifier(
                random_state=42, n_jobs=-1, verbosity=0, use_label_encoder=False
            ),
            "params": {
                "n_estimators": [100, 200],
                "learning_rate": [0.05, 0.1],
                "max_depth": [4, 6, 8]
            }
        },
        {
            "name": "LightGBM",
            "estimator": lgb.LGBMClassifier(random_state=42, n_jobs=-1, verbose=-1),
            "params": {
                "n_estimators": [100, 200],
                "learning_rate": [0.05, 0.1],
                "num_leaves": [31, 63]
            }
        }
    ]

    all_results = []
    best_accuracy = 0
    best_model_obj = None
    best_vectorizer = vectorizer

    for cfg in models:
        res, model = run_gridsearch(
            cfg["estimator"], cfg["params"],
            X_train_vec, y_train, X_test_vec, y_test,
            label_encoder, cfg["name"]
        )
        if res:
            all_results.append(res)
            if res["Accuracy"] > best_accuracy:
                best_accuracy = res["Accuracy"]
                best_model_obj = model
                best_vectorizer = vectorizer

    # ================================================================
    #  Auto-improvement if below 95%
    # ================================================================
    if best_accuracy < 0.95:
        print(f"\n{'#' * 60}")
        print(f"  Best accuracy: {best_accuracy:.4f} < 0.95 - improving...")
        print(f"{'#' * 60}")

        vec2 = TfidfVectorizer(
            ngram_range=(1, 3), max_features=20000,
            sublinear_tf=True, min_df=2, max_df=0.95
        )
        X_train_v2 = vec2.fit_transform(X_train)
        X_test_v2 = vec2.transform(X_test)

        print("[*] Applying SMOTE...")
        smote = SMOTE(random_state=42)
        X_train_res, y_train_res = smote.fit_resample(X_train_v2, y_train)

        improved_cfgs = [
            ("Logistic Regression (improved)",
             LogisticRegression(C=10, solver='liblinear', max_iter=1000,
                                class_weight='balanced', random_state=42, n_jobs=-1),
             {}),
            ("Random Forest (improved)",
             RandomForestClassifier(n_estimators=300, max_depth=40, min_samples_split=2,
                                    class_weight='balanced', random_state=42, n_jobs=-1),
             {}),
            ("XGBoost (improved)",
             xgb.XGBClassifier(n_estimators=300, learning_rate=0.1, max_depth=8,
                               subsample=0.8, colsample_bytree=0.8,
                               random_state=42, n_jobs=-1, verbosity=0, use_label_encoder=False),
             {}),
            ("LightGBM (improved)",
             lgb.LGBMClassifier(n_estimators=300, learning_rate=0.1, num_leaves=63,
                                subsample=0.8, colsample_bytree=0.8,
                                random_state=42, n_jobs=-1, verbose=-1),
             {})
        ]

        for name, est, params in improved_cfgs:
            print(f"\n[*] Training {name}...")
            start = time.time()
            if params:
                gs = GridSearchCV(est, params, cv=3, scoring='accuracy', n_jobs=-1, verbose=0)
                gs.fit(X_train_res, y_train_res)
                model = gs.best_estimator_
                cv_score = gs.best_score_
            else:
                model = est
                model.fit(X_train_res, y_train_res)
                cv_score = None
            elapsed = time.time() - start
            res = evaluate_model(model, X_test_v2, y_test, label_encoder,
                                 f"{name} ({elapsed:.1f}s)")
            res["X_test"] = X_test_v2
            all_results.append(res)
            if res["Accuracy"] > best_accuracy:
                best_accuracy = res["Accuracy"]
                best_model_obj = model
                best_vectorizer = vec2

    total_time = time.time() - total_start

    # ================================================================
    #  Summary & Visualizations
    # ================================================================
    metrics_df = pd.DataFrame([
        {k: round(v, 4) if isinstance(v, float) else v
         for k, v in r.items() if k not in ('y_pred', 'y_test', 'cm', 'model', 'X_test')}
        for r in all_results
    ])
    metrics_df = metrics_df.sort_values("Accuracy", ascending=False).reset_index(drop=True)
    metrics_df.to_csv("results/metrics.csv", index=False)

    print(f"\n{'=' * 60}")
    print(f"  RESULTS SUMMARY")
    print(f"{'=' * 60}")
    print(metrics_df.to_string(index=False))
    print(f"\n  Total time: {total_time:.1f}s")

    best_row = metrics_df.iloc[0]
    print(f"\n  {'*' * 60}")
    print(f"  BEST: {best_row['Model']} | Accuracy: {best_row['Accuracy']:.4f}")
    print(f"  {'*' * 60}")

    plot_accuracy_comparison(metrics_df)
    plot_confusion_matrices(all_results, label_encoder)

    for r in all_results:
        m_name = r["Model"]
        m = r["model"]
        # For feature importance, use the original vectorizer or improved one
        vec_used = best_vectorizer if "improved" in m_name else vectorizer
        plot_feature_importance(m, vec_used, m_name)

    plot_roc_curves(all_results, label_encoder)

    save_artifacts(best_model_obj, best_vectorizer, label_encoder)
    print("\n[OK] Training complete.")


if __name__ == "__main__":
    main()
