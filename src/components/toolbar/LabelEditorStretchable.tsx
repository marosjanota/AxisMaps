import React, { useEffect, useState } from "react";
import { useMap } from "../context/MapInstanceContext";
import { Box, TextField } from "@mui/material";
import { GeoJSONSource, MapMouseEvent } from "maplibre-gl";

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

  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!map || !text) return;

    const sourceId = "text-source";
    const layerId = "text-and-rectangle-layer";

    const addLabelWithRoundedRectangle = async (lng: number, lat: number) => {
      if (!text) return;

      const backgroundImage = await generateBackgroundImage("#FFD7DD");
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
              'text-field': ['get', 'name'],
              'icon-text-fit': 'both',
              'icon-image': ['get', 'image-name'],
              'icon-overlap': 'always',
              'text-overlap': 'always',
              "text-font": ["NotoSans-Regular"],
          }
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

export default LabelEditorStretchable;
