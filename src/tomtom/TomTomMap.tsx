import React, { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Box from "@mui/material/Box/Box";
import LayerToggle from "./LayerToggle";
import SearchPlace from "./SearchPlace";

const API_KEY = "3511aLbdzJWwIOPGg5PxuE6AAARooszw";

const TomTomMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<tt.Map | null>(null);

  const [countryLongitude, setCountryLongitude] = useState(-121.91599);
  const [countryLatitude, setCountryLatitude] = useState(37.36765);

  const setCountry = (latitude: number, longitude: number): void => {
    setCountryLatitude(latitude) 
    setCountryLongitude(longitude)
  }
 
  useEffect(() => {
    if (mapElement.current) {
      mapInstance.current = tt.map({
        key: API_KEY,
        container: mapElement.current,
        center: [countryLongitude, countryLatitude],
        zoom: 10,
        style: {
          map: "2/basic_street-satellite", // 2/basic_street-satellite, basic_main
          trafficIncidents: "incidents_day",
          trafficFlow: "flow_relative0",
          poi: "poi_main",
        },
      });

      mapInstance.current.addControl(new tt.NavigationControl());

      return () => {
        mapInstance.current?.remove();
      };
    }
  }, [countryLongitude, countryLatitude]);

  return (
    <Box sx={{ flex: 1 }}>
      <SearchPlace setCountryPosition={setCountry} apikey={API_KEY}></SearchPlace>
      <LayerToggle mapInstance={mapInstance} />
      <div ref={mapElement} style={{ height: "100%", width: "100%" }} />;
    </Box>
  );
};

export default TomTomMap;
