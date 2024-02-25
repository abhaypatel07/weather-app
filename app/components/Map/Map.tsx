"use client"
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Iprop {
  setLatLong: React.Dispatch<React.SetStateAction<{ lat: number; long: number }>>; 
}

const Map: React.FC<Iprop> = (props) => {
  const setLatLong = props.setLatLong;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      mapInstance.current.on("click", (e) => {
        const { lat, lng } = e.latlng;
        setLatLong({ lat:lat, long: lng });
        // console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mapContainer} style={{ height: "250px", width: "400px",boxSizing:"border-box",cursor:"pointer",borderRadius:"10px" }}  className="forMap"/>;
};

export default Map;
