import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { riskColor } from "../../utils/riskColor";

export default function HotspotMap({ hotspots, selectedId, onSelect }) {
  const center = hotspots.length
    ? [hotspots[0].center_latitude, hotspots[0].center_longitude]
    : [22.9, 78.6];

  return (
    <div className="rounded-2xl overflow-hidden border border-ink-100 shadow-glossy h-[520px]">
      <MapContainer center={center} zoom={5} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotspots.map((h) => (
          <CircleMarker
            key={h.hotspot_id}
            center={[h.center_latitude, h.center_longitude]}
            radius={Math.max(6, Math.min(22, Math.sqrt(h.accident_count) * 1.4))}
            pathOptions={{
              color: riskColor(h.risk_level),
              fillColor: riskColor(h.risk_level),
              fillOpacity: h.hotspot_id === selectedId ? 0.75 : 0.45,
              weight: h.hotspot_id === selectedId ? 3 : 1.5,
            }}
            eventHandlers={{ click: () => onSelect(h.hotspot_id) }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">Hotspot #{h.hotspot_id}</p>
                <p>{h.accident_count} accidents · risk {h.risk_level}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
