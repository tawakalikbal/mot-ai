import { Loader } from "@googlemaps/js-api-loader";
import { useRef } from "react";
import { useEffect } from "react";

export const useTouristSpots = ({
  center,
  zoom,
  data,
  mapRef,
  onClickMarker,
}) => {
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const loader = new Loader({
    // eslint-disable-next-line no-undef
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["places"], // Add other libraries as needed
  });
  useEffect(() => {
    const initMap = async () => {
      try {
        const { Map } = await loader.importLibrary("maps");

        // Create map instance
        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          minZoom: zoom - 2,
          mapId: "DEMO_MAP_ID", // Required for advanced markers
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    const updateMarkers = async () => {
      const { AdvancedMarkerElement } = await loader.importLibrary("marker");
      const { InfoWindow } = await loader.importLibrary("maps");

      const infoWindow = new InfoWindow();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      data.forEach((markerData, index) => {
        const marker = new AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position: { lat: markerData.lat, lng: markerData.lng },
          title: markerData.title || markerData.name || "Marker",
        });

        // Add click event listener - THIS IS THE KEY PART
        marker.addListener("click", () => {
          const markerPosition = { lat: markerData.lat, lng: markerData.lng };

          const content = `
    <div style="display: flex; max-width: 300px; gap: 12px; align-items: items-center; font-family: Arial, sans-serif; padding-top: 12px;">
      ${
        markerData.image
          ? `<img src="${markerData.image}" alt="${markerData.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 16px;">`
          : ""
      }
      <div style="flex: 1; display:flex; flex-direction: column; justify-content: center;">
        ${
          markerData.type
            ? `<div style="color: #1E88E5; font-size: 12px; margin-bottom: 4px;">${markerData.type}</div>`
            : ""
        }
        <div style="font-size: 16px; font-weight: bold; color: #222; margin-bottom: 4px;">
          ${markerData.name || markerData.title || ""}
        </div>
        ${
          markerData.location
            ? `<div style="color: #888; font-size: 12px;">${markerData.location}</div>`
            : ""
        }
      </div>
    </div>
  `;
          infoWindow.setContent(content);
          infoWindow.open(mapInstanceRef.current, marker);

          // Call custom callback if provided
          if (onClickMarker) {
            onClickMarker(markerData, index);
          }
          mapInstanceRef.current.panTo(markerPosition);
          mapInstanceRef.current.setZoom(17);
        });

        markersRef.current.push(marker);
      });
    };
    if (!mapInstanceRef.current) {
      initMap();
    }
    updateMarkers();
  }, []);
};
