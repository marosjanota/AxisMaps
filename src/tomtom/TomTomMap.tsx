import React, { useEffect, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Box from "@mui/material/Box/Box";
import LayerToggle from "./LayerToggle";

const API_KEY = "3511aLbdzJWwIOPGg5PxuE6AAARooszw";

const TomTomMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<tt.Map | null>(null);

  useEffect(() => {
    if (mapElement.current) {
      mapInstance.current = tt.map({
        key: API_KEY,
        container: mapElement.current,
        center: [4.899, 52.372],
        zoom: 10,
      });

      mapInstance.current.addControl(new tt.NavigationControl());

      return () => {
        mapInstance.current?.remove();
      };
    }
  }, []);

  return (
    <Box sx={{ flex: 1 }}>
      <LayerToggle mapInstance={mapInstance} />
      <div ref={mapElement} style={{ height: "100%", width: "100%" }} />;
    </Box>
  );
};

export default TomTomMap;
