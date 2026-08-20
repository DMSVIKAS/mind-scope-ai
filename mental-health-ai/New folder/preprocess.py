import re
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import joblib


def clean_text(text: str) -> str:
    """Clean a single text string: lowercase, remove URLs, HTML, punctuation, digits, extra spaces."""
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\d+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def load_and_preprocess(csv_path: str, text_col: str = None, label_col: str = None):
    """Load CSV and auto-detect or use user-specified text/label columns."""
    df = pd.read_csv(csv_path)
    potential_text = [c for c in df.columns if c.lower() in ('text', 'sentence', 'statement', 'review', 'tweet', 'comment', 'message')]
    potential_label = [c for c in df.columns if c.lower() in ('label', 'sentiment', 'class', 'category', 'status', 'target')]
    if text_col is None:
        if potential_text:
            text_col = potential_text[0]
        else:
            text_col = df.columns[0] if len(df.columns) == 2 else df.columns[1]
    if label_col is None:
        if potential_label:
            label_col = potential_label[0]
        else:
            label_col = df.columns[1] if len(df.columns) == 2 else df.columns[2]
    print(f"Using text column: '{text_col}' | label column: '{label_col}'")
    df = df[[text_col, label_col]].dropna().drop_duplicates()
    df[text_col] = df[text_col].astype(str)
    print(f"Rows after dropping nulls/duplicates: {len(df)}")
    return df, text_col, label_col


def get_tfidf_vectorizer():
    """Return a TF-IDF vectorizer with ngram_range=(1,2) and max_features=10000."""
    return TfidfVectorizer(ngram_range=(1, 2), max_features=10000)


def encode_labels(y):
    """Encode string labels to integers using LabelEncoder."""
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    return y_encoded, le


def save_artifacts(model, vectorizer, label_encoder=None, model_path="saved_models/best_model.pkl",
                   vec_path="saved_models/tfidf.pkl", le_path="saved_models/label_encoder.pkl"):
    """Save trained model, TF-IDF vectorizer, and optional label encoder to disk."""
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vec_path)
    if label_encoder is not None:
        joblib.dump(label_encoder, le_path)
    print(f"Saved: {model_path}, {vec_path}" + (f", {le_path}" if label_encoder else ""))


def load_artifacts(model_path="saved_models/best_model.pkl",
                   vec_path="saved_models/tfidf.pkl",
                   le_path="saved_models/label_encoder.pkl"):
    """Load saved model, vectorizer, and label encoder from disk."""
    model = joblib.load(model_path)
    vectorizer = joblib.load(vec_path)
    label_encoder = joblib.load(le_path) if le_path else None
    return model, vectorizer, label_encoder
