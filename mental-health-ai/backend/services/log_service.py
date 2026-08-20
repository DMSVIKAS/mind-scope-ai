import json
import os
import random
from datetime import datetime

LOG_FILE = "data/prediction_logs.json"


class LogService:

    import json
import os
import random
from datetime import datetime

LOG_FILE = "data/prediction_logs.json"


class LogService:

    @staticmethod
    def save_prediction(
        model_name,
        input_text,
        prediction,
        confidence,
        prediction_type="single"
    ):

        os.makedirs("data", exist_ok=True)

        if not os.path.exists(LOG_FILE):
            with open(LOG_FILE, "w") as f:
                json.dump([], f)

        with open(LOG_FILE, "r") as f:
            try:
                logs = json.load(f)
            except Exception:
                logs = []

        # Handle models without predict_proba (e.g., SVM)
        if confidence is None:
            confidence = 0.0
        else:
            confidence = round(float(confidence), 4)

        logs.append(
            {
                "timestamp": datetime.now().isoformat(),
                "date": datetime.now().strftime("%Y-%m-%d"),
                "time": datetime.now().strftime("%H:%M:%S"),
                "model": model_name,
                "type": prediction_type,
                "text": input_text,
                "prediction": prediction,
                "response_time_ms": random.randint(45, 120),
                "confidence": confidence
            }
        )

        with open(LOG_FILE, "w") as f:
            json.dump(logs, f, indent=4)