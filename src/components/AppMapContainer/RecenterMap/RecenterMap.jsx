import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, Math.max(map.getZoom(), 16.5));
    }
  }, [position]);

  return null;
}

export default RecenterMap;
