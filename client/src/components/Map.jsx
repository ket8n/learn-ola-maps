import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const Map = () => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [74.124, 15.2993], // Centering the map on India
      zoom: 7, // Adjust zoom level as needed
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        if (!url.includes("?")) {
          url = url + `?api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`;
        } else {
          url = url + `&api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`;
        }
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
  }, [mapReady]);

  return (
    <div
      style={{ width: "80%", height: "500px", overflow: "hidden" }} // Adjusted width and height
      ref={() => setMapReady(true)}
      id="central-map"
    />
  );
};
