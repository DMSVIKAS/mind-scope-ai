from fastapi import APIRouter
from services.model_metrics import ModelMetrics
from services.analytics_service import AnalyticsService

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get("/summary")
def summary():

    return AnalyticsService.get_summary()


@router.get("/distribution")
def distribution():

    return AnalyticsService.get_prediction_distribution()


@router.get("/models")
def models():

    return AnalyticsService.get_model_usage()


@router.get("/recent")
def recent():

    return AnalyticsService.get_recent_predictions()

@router.get("/timeline")
def timeline():

    return AnalyticsService.get_timeline()

@router.get("/confidence")
def confidence():

    return AnalyticsService.get_confidence_distribution()

@router.get("/disorders")
def disorder_distribution():
    return AnalyticsService.get_disorder_distribution()
@router.get("/health")
def ai_health():
    return AnalyticsService.get_ai_health()
@router.get("/confidence-trend")
def confidence_trend():

    return AnalyticsService.get_confidence_trend()
@router.get("/model-metrics")
async def model_metrics():

    return ModelMetrics.get_metrics()    

