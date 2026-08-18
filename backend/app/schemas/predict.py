from pydantic import BaseModel, Field


class RiskPredictionRequest(BaseModel):
    hour: int = Field(ge=0, le=23)
    day_of_week_code: int = Field(ge=1, le=7, description="1=Sunday ... 7=Saturday")
    road_type_code: int
    speed_limit: int
    junction_detail_code: int
    junction_control_code: int
    light_conditions_code: int
    weather_conditions_code: int
    road_surface_conditions_code: int
    urban_or_rural_area_code: int
    special_conditions_code: int = 0
    carriageway_hazards_code: int = 0


class ContributingFactor(BaseModel):
    feature: str
    contribution: float


class RiskPredictionResponse(BaseModel):
    predicted_severity_label: str
    severe_probability: float
    risk_level: str
    top_factors: list[ContributingFactor]
