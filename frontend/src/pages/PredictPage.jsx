import { useState } from "react";
import { Gauge } from "lucide-react";
import RiskForm from "../components/predict/RiskForm";
import RiskResult from "../components/predict/RiskResult";
import { PageHeader } from "./DashboardPage";

export default function PredictPage() {
  const [result, setResult] = useState(null);

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <PageHeader
        icon={Gauge}
        title="Risk predictor"
        subtitle="Describe the pre-crash conditions at a location and time — the model estimates severity risk from historical patterns."
      />

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <RiskForm onResult={setResult} />
        </div>
        <RiskResult result={result} />
      </div>
    </div>
  );
}
