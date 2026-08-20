from preprocessing.preprocess import load_data

X_train, X_test, y_train, y_test = load_data()

print("Training samples:", X_train.shape)
print("Testing samples:", X_test.shape)