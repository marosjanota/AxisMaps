import React, { useEffect, useState } from "react";
import { useMap } from "../context/MapInstanceContext";
import { TextField } from "@mui/material";
import { GeoJSONSource, MapMouseEvent } from "maplibre-gl";
const geojsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: [],
};
const IconTextEditor: React.FC = () => {
  const { map } = useMap();
  const [text, setText] = useState<string>("");
  useEffect(() => {
    if (!map || !text) return;
    const sourceId = "text-source";
    const layerId = "text-layer";
    const addIconToMap = (lng: number, lat: number) => {
      if (!text) return;
      geojsonData.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        properties: {
          title: text,
        },
      });
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: geojsonData,
        });
      }
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "text-field": ["get", "title"], // Get the title property from GeoJSON
            "text-size": 14,
            "text-font": ["NotoSans-Regular"],
            "text-anchor": "top",
            "text-offset": [0, 1.3],
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
          },
        });
      } else {
        const geoJsonSource = map.getSource(sourceId) as GeoJSONSource;
        geoJsonSource.setData(geojsonData);
      }
    };
    const handleClick = (e: MapMouseEvent & object) => {
      addIconToMap(e.lngLat.lng, e.lngLat.lat);
    };
    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, text]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
      <TextField
        label="Enter Icon Text"
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleChange}
      />
  );
};
export default IconTextEditor;