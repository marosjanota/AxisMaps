import React, { useEffect, useState } from "react";
import { useMap } from "../context/MapInstanceContext";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { GeoJSONSource, MapMouseEvent } from "maplibre-gl";

const pointsData: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: "FeatureCollection",
  features: [],
};

const IconSelector: React.FC = () => {
  const { map } = useMap();
  const [selectedIconId, setSelectedIconId] = useState<string>("");
  const [iconIds, setIconIds] = useState<string[]>([]);

  useEffect(() => {
    if (!map) return;

    const spriteBaseUrl = map.getStyle().sprite;
    const spriteJsonUrl = `${spriteBaseUrl}.json`;

    const fetchSpriteData = async () => {
      try {
        const response = await fetch(spriteJsonUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch sprite data");
        }

        const spriteData = await response.json();
        setIconIds(Object.keys(spriteData));
      } catch (error) {
        console.error("Error loading sprite JSON:", error);
      }
    };

    fetchSpriteData();
  }, [map]);

  useEffect(() => {
    if (!map || !selectedIconId) return;

    const addIconToMap = (lng: number, lat: number) => {
      pointsData.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        properties: {
          icon: selectedIconId,
        },
      });

      // Check if the 'points' layer already exists
      if (!map.getLayer("points")) {
        map.addSource("points", {
          type: "geojson",
          data: pointsData,
        });

        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "{icon}",
            "icon-size": 1.5,
            "icon-allow-overlap": true,
          },
        });
      } else {
        const geoJsonSource = map.getSource("points") as GeoJSONSource;
        geoJsonSource.setData(pointsData);
      }

      map.triggerRepaint();
    };

    const handleClick = (e: MapMouseEvent & object) => {
      addIconToMap(e.lngLat.lng, e.lngLat.lat);
    };

    map.on("click", handleClick);

    return () => {
      map.off("click", handleClick);
    };
  }, [map, selectedIconId]);

  const handleIconChange = (event: SelectChangeEvent<string>) => {
    setSelectedIconId(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 300,
        mx: "auto",
        mt: 4,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="icon-selector-label">Select Icon</InputLabel>
        <Select
          labelId="icon-selector-label"
          id="country-selector"
          value={selectedIconId}
          onChange={handleIconChange}
          label="Select Icon"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {iconIds.map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IconSelector;
