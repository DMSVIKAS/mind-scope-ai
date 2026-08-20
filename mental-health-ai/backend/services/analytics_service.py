import json
import os
from datetime import datetime
from collections import Counter

LOG_FILE = "data/prediction_logs.json"


class AnalyticsService:

    @staticmethod
    def load_logs():

        if not os.path.exists(LOG_FILE):
            return []

        with open(LOG_FILE, "r") as f:
            try:
                return json.load(f)
            except Exception:
                return []

    @staticmethod
    def get_summary():

        logs = AnalyticsService.load_logs()

        if len(logs) == 0:
            return {
                "total_predictions": 0,
                "today_predictions": 0,
                "average_confidence": 0,
                "best_model": "-",
                "average_response_time": 0
            }

        today = datetime.now().strftime("%Y-%m-%d")

        today_logs = [
            log for log in logs
            if log.get("date") == today
        ]

        avg_conf = round(
            sum(log["confidence"] for log in logs) / len(logs),
            4
        )

        avg_response = round(
            sum(log.get("response_time_ms", 0) for log in logs) / len(logs),
            2
        )

        model_counter = Counter(
            log["model"] for log in logs
        )

        best_model = model_counter.most_common(1)[0][0]

        return {
            "total_predictions": len(logs),
            "today_predictions": len(today_logs),
            "average_confidence": avg_conf,
            "best_model": best_model,
            "average_response_time": avg_response
        }

    @staticmethod
    def get_prediction_distribution():

        logs = AnalyticsService.load_logs()

        counter = Counter(
            log["prediction"]
            for log in logs
        )

        return [
            {
                "name": k,
                "value": v
            }
            for k, v in counter.items()
        ]

    @staticmethod
    def get_model_usage():

        logs = AnalyticsService.load_logs()

        counter = Counter(
            log["model"]
            for log in logs
        )

        return [
            {
                "model": k,
                "count": v
            }
            for k, v in counter.items()
        ]

    @staticmethod
    def get_recent_predictions(limit=10):

        logs = AnalyticsService.load_logs()

        logs = sorted(
            logs,
            key=lambda x: x["timestamp"],
            reverse=True
        )

        return logs[:limit]

    @staticmethod
    def get_timeline():

        logs = AnalyticsService.load_logs()

        counter = Counter()

        for log in logs:

            date = log.get("date")

            if date:
                counter[date] += 1

        timeline = []

        for date, count in sorted(counter.items()):

            timeline.append({
                "date": date,
                "count": count
            })

        return timeline

    @staticmethod
    def get_confidence_distribution():

        logs = AnalyticsService.load_logs()

        buckets = {
            "60-70%": 0,
            "70-80%": 0,
            "80-90%": 0,
            "90-100%": 0
        }

        for log in logs:

            confidence = log["confidence"] * 100

            if confidence < 70:
                buckets["60-70%"] += 1

            elif confidence < 80:
                buckets["70-80%"] += 1

            elif confidence < 90:
                buckets["80-90%"] += 1

            else:
                buckets["90-100%"] += 1

        return [
            {
                "range": k,
                "count": v
            }
            for k, v in buckets.items()
        ]

    @staticmethod
    def get_disorder_distribution():

        logs = AnalyticsService.load_logs()

        counter = Counter()

        for log in logs:
            prediction = log.get("prediction", "Unknown")
            counter[prediction] += 1

        return [
            {
                "name": key,
                "value": value
            }
            for key, value in counter.items()
        ]

    @staticmethod
    def get_ai_health():

        logs = AnalyticsService.load_logs()

        if len(logs) == 0:
            return {
                "status": "Offline",
                "health_score": 0,
                "models_loaded": 0,
                "response_time": 0,
                "avg_confidence": 0,
                "best_model": "-"
            }

        avg_conf = round(
            sum(log["confidence"] for log in logs) / len(logs) * 100,
            2
        )

        avg_response = round(
            sum(log.get("response_time_ms", 0) for log in logs) / len(logs),
            2
        )

        model_counter = Counter(
            log["model"] for log in logs
        )

        best_model = model_counter.most_common(1)[0][0]

        score = 100

        if avg_conf < 80:
            score -= 8

        if avg_response > 30:
            score -= 5

        return {
            "status": "Healthy",
            "health_score": score,
            "models_loaded": 5,
            "response_time": avg_response,
            "avg_confidence": avg_conf,
            "best_model": best_model
        }
    @staticmethod
    def get_confidence_trend():

        logs = AnalyticsService.load_logs()

        if len(logs) == 0:
            return []

        trend = []

        for log in logs:

            trend.append({
                "date": log.get("date"),
                "confidence": round(log["confidence"] * 100, 2)
            })

        return trend
        