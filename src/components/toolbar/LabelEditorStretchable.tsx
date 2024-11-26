import React, { useEffect, useState } from "react";
import { useMap } from "../context/MapInstanceContext";
import { Box, Button, TextField } from "@mui/material";
import { GeoJSONSource, MapMouseEvent } from "maplibre-gl";
import { HuePicker } from "react-color";

const featureCollection: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: [],
};

const generateBackgroundImage = (color: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
      <rect x="0" y="0" width="140" height="140" rx="15" ry="15" fill="${color}" />
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

const LabelEditorStretchable: React.FC = () => {
  const { map } = useMap();

  const [showInputs, setShowInputs] = useState(false);
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState("#FFD7DD");

  useEffect(() => {
    if (!map || !(showInputs && text)) return;

    const sourceId = "text-source";
    const layerId = "text-and-rectangle-layer";

    const addLabelWithRoundedRectangle = async (lng: number, lat: number) => {
      if (!text) return;

      const backgroundImage = await generateBackgroundImage(color);
      const mapImageId = `img-lng${lng}-lat${lat}`;

      map.addImage(mapImageId, backgroundImage, {
        stretchX: [
          [25, 55],
          [85, 115],
        ],
        stretchY: [[25, 115]],
        //       [x1, y1, x2,  y2 ]
        content: [25, 25, 115, 115],
        pixelRatio: 2,
      });

      featureCollection.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        properties: {
          "image-name": mapImageId,
          name: text,
        },
      });

      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: featureCollection,
        });
      } else {
        const geoJsonSource = map.getSource(sourceId) as GeoJSONSource;
        geoJsonSource.setData(featureCollection);
      }

      // Add the layer if not already added
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "text-field": ["get", "name"],
            "icon-text-fit": "both",
            "icon-image": ["get", "image-name"],
            "icon-overlap": "always",
            "text-overlap": "always",
            "text-font": ["NotoSans-Regular"],
          },
        });
      }
    };

    const handleClick = (e: MapMouseEvent & object) => {
      (async () => {
        await addLabelWithRoundedRectangle(e.lngLat.lng, e.lngLat.lat);
      })();
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, text, color, showInputs]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleToggle = () => {
    setShowInputs((prev) => !prev);
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        {showInputs ? "Hide Label Editor" : "Show Label Editor"}
      </Button>

      {showInputs && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Enter Colored Label Text"
            variant="outlined"
            fullWidth
            multiline
            value={text}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HuePicker color={color} onChange={handleColorChange} />
            <Box
              sx={{
                width: 36,
                height: 36,
                backgroundColor: color,
                border: "1px solid black",
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default LabelEditorStretchable;
