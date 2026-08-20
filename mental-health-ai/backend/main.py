from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.predict import router as predict_router
from routes.analytics import router as analytics_router
from routes.history import router as history_router

app = FastAPI(
    title="MindScope AI Backend",
    version="1.0.0",
    description="Mental Health Prediction API"
)

# -------------------------------------------------
# CORS
# -------------------------------------------------

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Root Endpoints
# -------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "Welcome to MindScope AI Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# -------------------------------------------------
# API Routes
# -------------------------------------------------

app.include_router(
    predict_router,
    prefix="/api"
)

app.include_router(
    analytics_router,
    prefix="/api"
)

app.include_router(
    history_router,
    prefix="/api"
)