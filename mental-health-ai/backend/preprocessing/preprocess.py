import re
import joblib
import pandas as pd

from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder


lemmatizer = WordNetLemmatizer()

stop_words = set(stopwords.words("english"))

# Keep important sentiment words
stop_words.discard("not")
stop_words.discard("no")
stop_words.discard("never")


def clean_text(text):
    text = str(text).lower()

    # Remove URLs
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"www\S+", "", text)

    # Remove mentions and hashtags
    text = re.sub(r"@\w+", "", text)
    text = re.sub(r"#\w+", "", text)

    # Remove numbers and punctuation
    text = re.sub(r"[^a-zA-Z\s]", " ", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    words = []

    for word in text.split():
        if word not in stop_words:
            words.append(lemmatizer.lemmatize(word))

    return " ".join(words)


def load_data(path="data/Combined Data.csv"):

    df = pd.read_csv(path)

    # Remove unwanted column
    if "Unnamed: 0" in df.columns:
        df.drop(columns=["Unnamed: 0"], inplace=True)

    # Remove missing values
    df.dropna(inplace=True)

    # Remove duplicate statements
    df.drop_duplicates(subset=["statement"], inplace=True)

    # Clean text
    df["statement"] = df["statement"].apply(clean_text)

    X = df["statement"]
    y = df["status"]

    # Encode labels
    encoder = LabelEncoder()
    y = encoder.fit_transform(y)

    joblib.dump(encoder, "models/label_encoder.pkl")

    # Better TF-IDF
    vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words="english",
        max_features=30000,
        ngram_range=(1, 2),
        min_df=2,
        max_df=0.95,
        sublinear_tf=True
    )

    X = vectorizer.fit_transform(X)

    joblib.dump(vectorizer, "models/tfidf.pkl")

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
        stratify=y,
    )