from pathlib import Path
import joblib

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models" / "trained"


class ModelLoader:

    def __init__(self):

        self.models = {
            "logistic_regression": joblib.load(MODEL_DIR / "logistic_regression.pkl"),
            "random_forest": joblib.load(MODEL_DIR / "random_forest.pkl"),
            "xgboost": joblib.load(MODEL_DIR / "xgboost.pkl"),
            "lightgbm": joblib.load(MODEL_DIR / "lightgbm.pkl"),
            "svm": joblib.load(MODEL_DIR / "svm.pkl")
        }

        self.vectorizers = {
              "logistic_regression": joblib.load(MODEL_DIR / "tfidf_vectorizer.pkl"),
            "random_forest": joblib.load(MODEL_DIR / "randomforest_vectorizer.pkl"),
            "xgboost": joblib.load(MODEL_DIR / "xgboost_vectorizer.pkl"),
            "lightgbm": joblib.load(MODEL_DIR / "lightgbm_vectorizer.pkl"),
            "svm": joblib.load(MODEL_DIR / "svm_vectorizer.pkl")
        }

        self.label_encoder = joblib.load(
            MODEL_DIR / "label_encoder.pkl"
        )

    def get_model(self, model_name):

        return self.models[model_name]

    def get_vectorizer(self, model_name):

        return self.vectorizers[model_name]

    def get_label_encoder(self):

        return self.label_encoder


loader = ModelLoader()