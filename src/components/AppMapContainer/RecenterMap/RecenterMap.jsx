import { useEffect } from "react";
import { useMap } from "react-leaflet";

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position); // or map.flyTo(position)
    }
  }, [position]);

  return null;
}

export default RecenterMap;
