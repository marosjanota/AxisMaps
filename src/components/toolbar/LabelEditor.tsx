import React, { useEffect, useState } from "react";
import { useMap } from "../context/MapInstanceContext";
import { Box, TextField } from "@mui/material";
import { GeoJSONSource, MapMouseEvent } from "maplibre-gl";

const geojsonData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: [],
};

const createColoredIcon = (color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
      <rect x="0" y="0" width="120" height="60" rx="15" ry="15" fill="${color}" />
    </svg>
  `;
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
};

const LabelEditor: React.FC = () => {
  const { map } = useMap();

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!map || !text) return;

    const sourceId = "text-source";
    const layerId = "text-and-rectangle-layer";
    const imageId = "rounded-rect";

    const addLabelWithRoundedRectangle = async (lng: number, lat: number) => {
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

      // Update the rounded rectangle with the new fill color
      const roundedRectImage = await createColoredIcon("#FFD7DD");

      if (!map.hasImage(imageId)) {
        map.addImage(imageId, roundedRectImage);
      }

      // Add or update the source with the new geojsonData
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: geojsonData,
        });
      } else {
        const geoJsonSource = map.getSource(sourceId) as GeoJSONSource;
        geoJsonSource.setData(geojsonData); // Update the source with new features
      }

      // Add the layer if not already added
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "icon-image": imageId, // Use the image name
            "icon-size": 1, // Adjust size if needed
            "icon-anchor": "center", // Adjust anchor if needed
            "text-field": ["get", "title"], // Get the title property from GeoJSON
            "text-size": 14,
            "text-font": ["NotoSans-Regular"],
            "text-anchor": "top",
            "text-offset": [0, -0.5],
            "symbol-sort-key": ["get", "title"], // Optionally control the render order
          },
          paint: {
            "text-color": "#000000",
            "text-halo-color": "#FFFFFF",
            "text-halo-width": 2,
          },
        });
      }
    };

    const handleClick = (e: MapMouseEvent & object) => {
      (async () => {
        await addLabelWithRoundedRectangle(e.lngLat.lng, e.lngLat.lat);
      })();
      console.log("Feature coordinates:", geojsonData.features);
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
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <TextField
        label="Enter Colored Label Text"
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleChange}
      />
    </Box>
  );
};

export default LabelEditor;
