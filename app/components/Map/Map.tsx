

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Iprop {
  setLatLong: React.Dispatch<React.SetStateAction<{ lat: number; long: number }>>;
}

const Map: React.FC<Iprop> = (props) => {
  const { setLatLong } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;
    
      try {        
        const L = (await import("leaflet")).default;
        mapInstance.current = L.map(mapContainer.current).setView([0, 0], 2);
    
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance.current);
    
        mapInstance.current.on("click", (e) => {
          const { lat, lng } = e.latlng;
          setLatLong({ lat, long: lng });
        });
      } catch (error) {
        console.error("Failed to load Leaflet:", error);
      }
    };

    initializeMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [setLatLong]);

  return (
    <div
      ref={mapContainer}
      style={{ height: "250px", width: "400px", boxSizing: "border-box", cursor: "pointer", borderRadius: "10px" }}
      className="forMap"
    />
  );
};

export default Map;

