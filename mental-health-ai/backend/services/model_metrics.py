import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

METRICS_FILE = os.path.join(
    BASE_DIR,
    "data",
    "model_metrics.json"
)

class ModelMetrics:

    @staticmethod
    def get_metrics():
        with open(METRICS_FILE, "r") as f:
            return json.load(f)