import { useState } from "react";
import { MapPinned } from "lucide-react";
import HotspotMap from "../components/hotspots/HotspotMap";
import HotspotList from "../components/hotspots/HotspotList";
import HotspotDetailPanel from "../components/hotspots/HotspotDetailPanel";
import { useApi } from "../hooks/useApi";
import { hotspotsApi } from "../api/endpoints";
import { Loading, ErrorState } from "../components/common/StatusState";
import { PageHeader } from "./DashboardPage";

export default function HotspotsPage() {
  const [selectedId, setSelectedId] = useState(null);
  const { data, error, loading } = useApi(() => hotspotsApi.list(1, 300), []);

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <PageHeader
        icon={MapPinned}
        title="Hotspot explorer"
        subtitle="Geographic clusters detected with DBSCAN, ranked by a severity + volume risk score."
      />

      {loading && <Loading label="Clustering accident locations…" />}
      {error && <ErrorState error={error} />}

      {data && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HotspotMap hotspots={data} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
          <div className="space-y-6">
            <HotspotDetailPanel hotspotId={selectedId} />
          </div>
          <div className="lg:col-span-3">
            <HotspotList hotspots={data} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>
      )}
    </div>
  );
}
