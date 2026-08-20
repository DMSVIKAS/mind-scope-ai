import os
import sys
import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

# Add backend folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from preprocessing.preprocess import load_data


def train():

    # Load processed dataset
    X_train, X_test, y_train, y_test = load_data()

    # Logistic Regression Model
    model = LogisticRegression(
        C=10,
        solver="lbfgs",
        class_weight="balanced",
        max_iter=5000,
        random_state=42,
    )

    # Train model
    model.fit(X_train, y_train)

    # Predictions
    predictions = model.predict(X_test)

    # Accuracy
    accuracy = accuracy_score(y_test, predictions)

    print("=" * 60)
    print("        Logistic Regression Results")
    print("=" * 60)

    print(f"\nAccuracy : {accuracy:.4f}\n")

    print("Classification Report\n")
    print(classification_report(y_test, predictions))

    print("Confusion Matrix\n")
    print(confusion_matrix(y_test, predictions))

    # Save trained model
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/logistic.pkl")

    print("\n✅ Logistic Regression model saved successfully!")
    print("📁 models/logistic.pkl")


if __name__ == "__main__":
    train()