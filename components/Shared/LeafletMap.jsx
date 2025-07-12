"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import locations from "@/lib/location.json";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({
  center = [0.7893, 113.9213],
  zoom = 6,
  className = "h-96 w-full",
}) {
  console.log({ locations });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.tourist_spots.map((location) => (
        <Marker position={[location.lat, location.lng]} key={location.id}>
          <Popup>
            <div className="flex w-full gap-6 items-center">
              <img
                src={location.image}
                className="size-20 object-cover shrink-0 rounded-xl"
              />
              <div className="text-nowrap">
                <p className="text-blue-600">{location.type}</p>
                <p className="font-bold text-xl">{location.name}</p>
                <p className="text-slate-400 text-sm">{location.location}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
