import { BookOpenText, Terminal } from "lucide-react";
import DocsSidebar from "../components/docs/DocsSidebar";
import EndpointCard from "../components/docs/EndpointCard";
import CodeBlock from "../components/docs/CodeBlock";
import { PageHeader } from "./DashboardPage";
import { BASE_URL } from "../api/client";

export default function DocsPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <PageHeader
        icon={BookOpenText}
        title="Developer docs"
        subtitle="The UrbanRisk API is a plain REST/JSON service — no auth, no SDK required. Point any HTTP client at it."
      />

      <div className="flex gap-10">
        <DocsSidebar />

        <div className="flex-1 min-w-0 space-y-14">
          <section id="getting-started" className="scroll-mt-32">
            <SectionTitle icon={Terminal} title="Getting started" />
            <p className="text-ink-600 leading-relaxed mb-4">
              Every response is JSON. There is no authentication in this build — put it behind your
              own gateway/API key layer before exposing it publicly. The base URL for this deployment is:
            </p>
            <CodeBlock code={BASE_URL} language="base url" />
            <p className="text-ink-600 leading-relaxed mt-4 mb-2">Quick check the API is up:</p>
            <CodeBlock code={`curl ${BASE_URL}/health`} />
            <p className="text-ink-600 leading-relaxed mt-4 mb-2">From JavaScript:</p>
            <CodeBlock
              language="javascript"
              code={`const res = await fetch("${BASE_URL}/analytics/severity");\nconst data = await res.json();\nconsole.log(data);`}
            />
          </section>

          <section id="accidents" className="scroll-mt-32 space-y-6">
            <SectionTitle title="Accidents" />
            <EndpointCard
              id="accidents-list"
              method="GET"
              path="/accidents"
              title="List accidents"
              description="Paginated, filterable accident records. Combine filters freely; all are optional."
              params={[
                { name: "severity_code", type: "int (1-3)", desc: "1=Fatal, 2=Serious, 3=Slight" },
                { name: "year", type: "int", desc: "Filter to a calendar year" },
                { name: "urban_or_rural_area_code", type: "int", desc: "1=Urban, 2=Rural" },
                { name: "weather_conditions_code", type: "int", desc: "See /reference/codes" },
                { name: "road_surface_conditions_code", type: "int", desc: "See /reference/codes" },
                { name: "is_weekend", type: "bool", desc: "Filter to weekend accidents" },
                { name: "time_of_day", type: "string", desc: "Morning | Afternoon | Evening | Night" },
                { name: "page", type: "int", desc: "Default 1" },
                { name: "page_size", type: "int", desc: "Default 50, max 500" },
              ]}
              example={`curl "${BASE_URL}/accidents?severity_code=1&year=2018&page=1&page_size=2"`}
              response={`{
  "total": 646,
  "page": 1,
  "page_size": 2,
  "items": [
    {
      "accident_index": "3993",
      "longitude": 93.6099,
      "latitude": 27.1059,
      "severity_code": 1,
      "severity_label": "Fatal",
      "hour": 21,
      "time_of_day": "Night",
      "road_type_label": "Single carriageway",
      "weather_conditions_label": "Fine, no high winds",
      "accident_date": "2018-12-31"
    }
  ]
}`}
            />
            <EndpointCard
              id="accidents-detail"
              method="GET"
              path="/accidents/{accident_index}"
              title="Get a single accident"
              description="Full record for one accident by its index. Returns 404 if not found."
              example={`curl ${BASE_URL}/accidents/3993`}
              response={`{
  "accident_index": "3993",
  "severity_label": "Fatal",
  "road_type_label": "Single carriageway",
  "speed_limit": 30,
  "urban_or_rural_area_label": "Urban"
}`}
            />
          </section>

          <section id="analytics" className="scroll-mt-32 space-y-6">
            <SectionTitle title="Analytics" />
            <EndpointCard
              id="analytics-severity"
              method="GET"
              path="/analytics/severity"
              title="Severity breakdown"
              description="Total accidents grouped by outcome."
              example={`curl ${BASE_URL}/analytics/severity`}
              response={`{
  "breakdown": [
    { "label": "Fatal", "count": 646 },
    { "label": "Serious", "count": 7377 },
    { "label": "Slight", "count": 51975 }
  ],
  "total": 59998
}`}
            />
            <EndpointCard
              id="analytics-hourly"
              method="GET"
              path="/analytics/hourly"
              title="Hourly distribution"
              description="Accident counts for each hour of the day, split by severity."
              example={`curl ${BASE_URL}/analytics/hourly`}
              response={`[
  { "hour": 0, "count": 998, "fatal_count": 27, "serious_count": 169, "slight_count": 802 }
]`}
            />
            <EndpointCard
              id="analytics-yearly"
              method="GET"
              path="/analytics/yearly"
              title="Yearly trend"
              description="Total accidents per calendar year present in the dataset."
              example={`curl ${BASE_URL}/analytics/yearly`}
              response={`[{ "year": 2018, "count": 59998 }]`}
            />
            <EndpointCard
              id="analytics-dow"
              method="GET"
              path="/analytics/day-of-week"
              title="Day-of-week distribution"
              description="Accident counts by day of week (Sunday-Saturday)."
              example={`curl ${BASE_URL}/analytics/day-of-week`}
              response={`[{ "label": "Friday", "count": 9812 }]`}
            />
            <EndpointCard
              id="analytics-dimension"
              method="GET"
              path="/analytics/by-dimension/{dimension}"
              title="Counts by condition"
              description="Accident counts grouped by one categorical dimension."
              params={[
                { name: "dimension", type: "path", desc: "weather | road_surface | light | road_type | urban_rural | junction_detail | time_of_day" },
                { name: "severity_code", type: "int (1-3), optional", desc: "Restrict to one severity" },
              ]}
              example={`curl "${BASE_URL}/analytics/by-dimension/weather?severity_code=1"`}
              response={`[{ "label": "Fine, no high winds", "count": 49807 }]`}
            />
            <EndpointCard
              id="analytics-causes"
              method="GET"
              path="/analytics/leading-causes"
              title="Leading cause combinations"
              description="Most common weather + road surface + light combinations among Fatal/Serious accidents. There is no single 'cause' field in the source data, so this approximates it from correlated conditions."
              params={[{ name: "top_n", type: "int", desc: "Default 10, max 50" }]}
              example={`curl "${BASE_URL}/analytics/leading-causes?top_n=3"`}
              response={`[
  { "weather": "Fine, no high winds", "road_surface": "Dry", "light": "Daylight", "severe_accident_count": 4099 }
]`}
            />
          </section>

          <section id="hotspots" className="scroll-mt-32 space-y-6">
            <SectionTitle title="Hotspots" />
            <EndpointCard
              id="hotspots-list"
              method="GET"
              path="/hotspots"
              title="List hotspots"
              description="Precomputed DBSCAN clusters, ranked by risk score (highest first)."
              params={[
                { name: "min_accidents", type: "int", desc: "Only clusters with at least this many accidents" },
                { name: "limit", type: "int", desc: "Default 100, max 1000" },
              ]}
              example={`curl "${BASE_URL}/hotspots?limit=5"`}
              response={`[
  {
    "hotspot_id": 54,
    "center_latitude": 28.4553,
    "center_longitude": 77.0388,
    "accident_count": 2596,
    "fatal_count": 108,
    "risk_score": 0.6556,
    "risk_level": "High"
  }
]`}
            />
            <EndpointCard
              id="hotspots-detail"
              method="GET"
              path="/hotspots/{hotspot_id}"
              title="Hotspot detail"
              description="Adds top weather/road-surface conditions and the single peak accident hour for this cluster."
              example={`curl ${BASE_URL}/hotspots/54`}
              response={`{
  "hotspot_id": 54,
  "risk_level": "High",
  "top_weather": [{ "label": "Fine, no high winds", "count": 2269 }],
  "peak_hour_range": "17:00-18:00"
}`}
            />
          </section>

          <section id="predict" className="scroll-mt-32 space-y-6">
            <SectionTitle title="Predict" />
            <EndpointCard
              id="predict-risk"
              method="POST"
              path="/predict/risk"
              title="Severity risk prediction"
              description="Given pre-crash conditions only (no outcome fields), returns a severity-risk estimate from the trained Random Forest model."
              params={[
                { name: "hour", type: "int (0-23)", desc: "Required" },
                { name: "day_of_week_code", type: "int (1-7)", desc: "1=Sunday ... 7=Saturday" },
                { name: "road_type_code", type: "int", desc: "See /reference/codes" },
                { name: "speed_limit", type: "int", desc: "mph" },
                { name: "junction_detail_code", type: "int", desc: "See /reference/codes" },
                { name: "junction_control_code", type: "int", desc: "See /reference/codes" },
                { name: "light_conditions_code", type: "int", desc: "See /reference/codes" },
                { name: "weather_conditions_code", type: "int", desc: "See /reference/codes" },
                { name: "road_surface_conditions_code", type: "int", desc: "See /reference/codes" },
                { name: "urban_or_rural_area_code", type: "int", desc: "1=Urban, 2=Rural" },
              ]}
              example={`curl -X POST ${BASE_URL}/predict/risk \\
  -H "Content-Type: application/json" \\
  -d '{
    "hour": 21, "day_of_week_code": 6, "road_type_code": 6,
    "speed_limit": 60, "junction_detail_code": 0, "junction_control_code": -1,
    "light_conditions_code": 6, "weather_conditions_code": 2,
    "road_surface_conditions_code": 2, "urban_or_rural_area_code": 2
  }'`}
              response={`{
  "predicted_severity_label": "Slight",
  "severe_probability": 0.4413,
  "risk_level": "Moderate",
  "top_factors": [
    { "feature": "hour", "contribution": 0.2127 },
    { "feature": "speed_limit", "contribution": 0.0829 }
  ]
}`}
            />
            <p className="text-xs text-ink-400 -mt-2">
              Note: <code className="font-mono">top_factors</code> are the model&apos;s global
              feature importances, not a per-request SHAP explanation — treat them as &quot;what the
              model generally weighs,&quot; not &quot;why this specific score.&quot;
            </p>
          </section>

          <section id="reference" className="scroll-mt-32 space-y-6">
            <SectionTitle title="Reference codes" />
            <EndpointCard
              id="reference-codes"
              method="GET"
              path="/reference/codes"
              title="All code → label mappings"
              description="Every coded categorical field used across the API, mapped to its human-readable label. Use this to build dropdowns for the /predict/risk fields."
              example={`curl ${BASE_URL}/reference/codes`}
              response={`{
  "accident_severity": { "1": "Fatal", "2": "Serious", "3": "Slight" },
  "weather_conditions": { "1": "Fine, no high winds", "2": "Raining, no high winds" }
}`}
            />
          </section>

          <section id="errors" className="scroll-mt-32">
            <SectionTitle title="Errors" />
            <div className="glossy-card rounded-2xl p-6">
              <p className="text-sm text-ink-600 mb-4">
                Errors follow FastAPI&apos;s default shape — a JSON body with a <code className="font-mono text-brand-700">detail</code> field.
              </p>
              <CodeBlock language="json" code={`{ "detail": "Accident not found" }`} />
              <ul className="mt-4 text-sm text-ink-600 space-y-1.5">
                <li><span className="font-mono text-xs bg-ink-100 rounded px-1.5 py-0.5 mr-2">404</span>Resource not found (bad accident_index or hotspot_id)</li>
                <li><span className="font-mono text-xs bg-ink-100 rounded px-1.5 py-0.5 mr-2">422</span>Request failed validation (bad query/body params)</li>
                <li><span className="font-mono text-xs bg-ink-100 rounded px-1.5 py-0.5 mr-2">503</span>Model not loaded yet — run <code className="font-mono">scripts/train_severity_model.py</code></li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {Icon && <Icon size={18} className="text-brand-600" />}
      <h2 className="text-xl font-bold text-ink-900 tracking-tight">{title}</h2>
    </div>
  );
}
