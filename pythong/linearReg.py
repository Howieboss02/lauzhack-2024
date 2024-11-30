import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Load Dataset
def load_data():
    # Example: Use a publicly available dataset like FakeNewsNet or LIAR
    dataset_url = "https://raw.githubusercontent.com/datasets/fake-news/master/data/fake_or_real_news.csv"
    df = pd.read_csv(dataset_url)
    return df['text'], df['label']

# Preprocess and Split Data
def preprocess_data(texts, labels):
    vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
    X = vectorizer.fit_transform(texts)
    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)
    return X_train, X_test, y_train, y_test, vectorizer

# Train Model
def train_model(X_train, y_train):
    model = LogisticRegression()
    model.fit(X_train, y_train)
    return model

# Evaluate Model
def evaluate_model(model, X_test, y_test):
    predictions = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, predictions))
    print(classification_report(y_test, predictions))

# Main Function
def main():
    texts, labels = load_data()
    X_train, X_test, y_train, y_test, vectorizer = preprocess_data(texts, labels)
    model = train_model(X_train, y_train)
    evaluate_model(model, X_test, y_test)

    # Save the model and vectorizer for later use
    import joblib
    joblib.dump(model, 'fake_news_model.pkl')
    joblib.dump(vectorizer, 'vectorizer.pkl')

main()