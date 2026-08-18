from fastapi import APIRouter, HTTPException

from app.schemas.predict import RiskPredictionRequest, RiskPredictionResponse
from app.services import prediction_service

router = APIRouter(prefix="/predict", tags=["predict"])


@router.post("/risk", response_model=RiskPredictionResponse)
def predict_risk(payload: RiskPredictionRequest):
    try:
        return prediction_service.predict_risk(payload.model_dump())
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
