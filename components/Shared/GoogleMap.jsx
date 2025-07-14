// components/GoogleMap.js
import { React, useRef } from "react";

import { useTouristSpots } from "@/hooks/useTouristSpots";

export const GoogleMap = ({
  center = { lat: 0.7893, lng: 113.9213 },
  zoom = 5,
  data,
  className = "w-full h-96",
  onClickMarker,
}) => {
  const mapRef = useRef(null);

  useTouristSpots({ center, zoom, data, mapRef, onClickMarker });

  return <div ref={mapRef} className={className} />;
};
