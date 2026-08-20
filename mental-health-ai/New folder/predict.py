import sys
import numpy as np
import joblib

from preprocess import clean_text, load_artifacts


def predict_sentiment(text: str, model_path="saved_models/best_model.pkl",
                      vec_path="saved_models/tfidf.pkl",
                      le_path="saved_models/label_encoder.pkl"):
    try:
        model, vectorizer, label_encoder = load_artifacts(model_path, vec_path, le_path)
    except FileNotFoundError as e:
        return f"[ERROR] Missing artifact: {e}", None

    cleaned = clean_text(text)
    if not cleaned:
        return "EMPTY_TEXT", 0.0

    vec = vectorizer.transform([cleaned])

    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(vec)[0]
        pred_idx = int(np.argmax(proba))
        confidence = float(np.max(proba))
    else:
        pred_idx = int(model.predict(vec)[0])
        if hasattr(model, "decision_function"):
            scores = model.decision_function(vec)[0]
            if scores.ndim == 0:
                scores = np.array([scores])
            confidence = float(1.0 / (1.0 + np.exp(-np.max(scores))))
        else:
            confidence = 1.0

    if label_encoder:
        label = label_encoder.inverse_transform([pred_idx])[0]
    else:
        label = str(pred_idx)

    return label, confidence


def main():
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
    else:
        text = input("Enter text: ")

    label, confidence = predict_sentiment(text)
    print(f"\nPredicted sentiment: {label}")
    print(f"Confidence: {confidence:.4f}")


if __name__ == "__main__":
    main()
