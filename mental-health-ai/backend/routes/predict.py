from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import pandas as pd
from io import StringIO

from services.predict import Predictor
from services.log_service import LogService
from schemas.predict_schema import TextPredictionRequest

router = APIRouter(tags=["Prediction"])


# -------------------------------------------------
# Batch Prediction (CSV)
# -------------------------------------------------
@router.post("/predict")
async def predict(
    model_name: str = Form(...),
    file: UploadFile = File(...)
):
    try:

        if not file.filename.endswith(".csv"):
            raise HTTPException(
                status_code=400,
                detail="Please upload a CSV file."
            )

        contents = await file.read()

        df = pd.read_csv(
            StringIO(contents.decode("utf-8"))
        )

        result = Predictor.predict_dataframe(
            df,
            model_name
        )

        # Save every prediction
        for _, row in result.iterrows():

            confidence = row["confidence"]

            if confidence is None:
                confidence = 0.0

            LogService.save_prediction(
                model_name=model_name,
                input_text=row["statement"],
                prediction=row["prediction"],
                confidence=confidence,
                prediction_type="batch"
            )

        return JSONResponse(
            content={
                "success": True,
                "rows": len(result),
                "predictions": result.to_dict(orient="records")
            }
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -------------------------------------------------
# Single Text Prediction
# -------------------------------------------------
@router.post("/predict-text")
async def predict_text(request: TextPredictionRequest):

    try:

        df = pd.DataFrame({
            "statement": [request.text]
        })

        result = Predictor.predict_dataframe(
            df,
            request.model_name
        )

        prediction = result.iloc[0]

        confidence = prediction["confidence"]

        if confidence is None:
            confidence = 0.0

        LogService.save_prediction(
            model_name=request.model_name,
            input_text=request.text,
            prediction=prediction["prediction"],
            confidence=confidence,
            prediction_type="single"
        )

        return {
            "success": True,
            "prediction": prediction["prediction"],
            "confidence": float(confidence)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -------------------------------------------------
# Compare All Models
# -------------------------------------------------
@router.post("/compare-models")
async def compare_models(request: TextPredictionRequest):

    try:

        models = [
            "logistic_regression",
            "random_forest",
            "svm",
            "xgboost",
            "lightgbm"
        ]

        results = []

        for model in models:

            df = pd.DataFrame({
                "statement": [request.text]
            })

            prediction = Predictor.predict_dataframe(
                df,
                model
            ).iloc[0]

            confidence = prediction["confidence"]

            if confidence is None:
                confidence = 0.0

            results.append({
                "model": model,
                "prediction": prediction["prediction"],
                "confidence": round(float(confidence), 4)
            })

        return {
            "success": True,
            "results": results
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )