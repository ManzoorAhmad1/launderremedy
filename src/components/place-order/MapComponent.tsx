"use client";

import { useEffect } from "react";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  LayersControl, 
  ScaleControl,
  useMap,
  useMapEvents 
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";

// Fix leaflet default markers
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
}

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  marker: [number, number] | null;
  onMapClick: (latlng: [number, number]) => void;
  onLocate?: () => void;
  children?: React.ReactNode;
}

const MapUpdater = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapClickHandler = ({ onClick }: { onClick: (latlng: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
    locationfound(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default function MapComponent({ 
  center, 
  zoom, 
  marker, 
  onMapClick, 
  onLocate,
  children 
}: MapComponentProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      touchZoom={true}
      scrollWheelZoom={true}
      dragging={true}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Street View">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Dark Mode">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <ScaleControl position="bottomleft" />
      
      {marker && <Marker position={marker} />}
      
      <MapUpdater center={center} zoom={zoom} />
      <MapClickHandler onClick={onMapClick} />
      
      {onLocate && (
        <div className="leaflet-bottom leaflet-right" style={{ bottom: '20px', right: '10px', zIndex: 1000, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
            <button
            className="bg-white hover:bg-neutral-50 border border-neutral-300 w-10 h-10 flex items-center justify-center cursor-pointer text-neutral-600 hover:text-primary-600 transition-colors rounded shadow-sm"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onLocate();
            }}
            title="Show my location"
            >
            <Navigation className="w-5 h-5" />
            </button>
        </div>
        </div>
      )}

      {children}
    </MapContainer>
  );
}
