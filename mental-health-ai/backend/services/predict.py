import numpy as np
import pandas as pd

from services.model_loader import loader


class Predictor:

    @staticmethod
    def predict_dataframe(df: pd.DataFrame, model_name: str):

        # ------------------------------------------
        # Validate input
        # ------------------------------------------
        if "statement" not in df.columns:
            raise ValueError("CSV must contain a 'statement' column.")

        # ------------------------------------------
        # Clean text
        # ------------------------------------------
        df["statement"] = (
            df["statement"]
            .fillna("")
            .astype(str)
            .str.strip()
        )

        print("\n======================================")
        print("Selected Model:", model_name)
        print("Input Text:", df["statement"].iloc[0])

        model = loader.get_model(model_name)
        encoder = loader.get_label_encoder()

        # ------------------------------------------
        # Logistic Regression
        # ------------------------------------------
        if model_name == "logistic_regression":

            predictions = model.predict(df["statement"])

            print("Raw Prediction:", predictions)

            confidence = [None] * len(predictions)

            if hasattr(model, "predict_proba"):
                probs = model.predict_proba(df["statement"])
                confidence = probs.max(axis=1).round(4).tolist()

        # ------------------------------------------
        # Other Models
        # ------------------------------------------
        else:

            vectorizer = loader.get_vectorizer(model_name)

            X = vectorizer.transform(df["statement"])

            predictions = model.predict(X)

            print("Raw Prediction:", predictions)

            confidence = [None] * len(predictions)

            if hasattr(model, "predict_proba"):
                probs = model.predict_proba(X)
                confidence = probs.max(axis=1).round(4).tolist()

        # ------------------------------------------
        # Decode labels
        # ------------------------------------------
        predictions = np.array(predictions)

        print("Prediction dtype:", predictions.dtype)

        if np.issubdtype(predictions.dtype, np.number):
            labels = encoder.inverse_transform(predictions.astype(int))
        else:
            labels = predictions.tolist()

        print("Decoded Labels:", labels)

        # ------------------------------------------
        # Final Output
        # ------------------------------------------
        result_df = df.copy()

        result_df["prediction"] = labels
        result_df["confidence"] = confidence

        print("Confidence:", confidence)
        print("======================================\n")

        return result_df