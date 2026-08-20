from pydantic import BaseModel


class TextPredictionRequest(BaseModel):
    text: str
    model_name: str