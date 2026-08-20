from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import json
import os
import csv
from collections import Counter

router = APIRouter(
    prefix="/history",
    tags=["History"]
)

LOG_FILE = "data/prediction_logs.json"


def load_logs():

    if not os.path.exists(LOG_FILE):
        return []

    with open(LOG_FILE, "r") as f:

        try:
            return json.load(f)

        except:
            return []


# ---------------------------------------------------
# Get Complete History
# ---------------------------------------------------

@router.get("")
def get_history():

    logs = load_logs()

    logs.reverse()

    return logs


# ---------------------------------------------------
# History Statistics
# ---------------------------------------------------

@router.get("/stats")
def get_history_stats():

    logs = load_logs()

    if len(logs) == 0:

        return {
            "total_predictions": 0,
            "today_predictions": 0,
            "average_confidence": 0,
            "most_used_model": "-"
        }

    today = logs[-1]["date"]

    today_predictions = len(
        [x for x in logs if x["date"] == today]
    )

    average_confidence = round(

        sum(x["confidence"] for x in logs)

        / len(logs)

        * 100,

        2

    )

    model_counts = Counter(

        x["model"]

        for x in logs

    )

    most_used_model = model_counts.most_common(1)[0][0]

    return {

        "total_predictions": len(logs),

        "today_predictions": today_predictions,

        "average_confidence": average_confidence,

        "most_used_model": most_used_model

    }


# ---------------------------------------------------
# Delete Single History
# ---------------------------------------------------

@router.delete("/{index}")
def delete_history(index: int):

    logs = load_logs()

    if index >= len(logs):

        raise HTTPException(

            status_code=404,

            detail="Prediction not found"

        )

    logs.pop(index)

    with open(LOG_FILE, "w") as f:

        json.dump(logs, f, indent=4)

    return {

        "message": "Deleted successfully"

    }


# ---------------------------------------------------
# Delete All
# ---------------------------------------------------

@router.delete("")
def delete_all_history():

    with open(LOG_FILE, "w") as f:

        json.dump([], f)

    return {

        "message": "History cleared"

    }


# ---------------------------------------------------
# Export CSV
# ---------------------------------------------------

@router.get("/export")
def export_csv():

    logs = load_logs()

    csv_file = "data/history_export.csv"

    if len(logs) == 0:

        raise HTTPException(

            status_code=404,

            detail="No history found"

        )

    keys = logs[0].keys()

    with open(

        csv_file,

        "w",

        newline="",

        encoding="utf-8"

    ) as f:

        writer = csv.DictWriter(

            f,

            fieldnames=keys

        )

        writer.writeheader()

        writer.writerows(logs)

    return FileResponse(

        csv_file,

        filename="prediction_history.csv",

        media_type="text/csv"

    )