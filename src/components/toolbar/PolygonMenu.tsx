import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useMap } from "../context/MapInstanceContext";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MapMouseEvent } from "maplibre-gl";

export default function PolynomMenu() {
  const { map } = useMap();
  const [showInputs, setShowInputs] = useState(false);
  const [createPolygon, setCreatePolygon] = useState(false);
  const [polygonColor, setPolygonColor] = useState("#9999");
  const [polygonOpacity, setPolygonOpacity] = useState("0.6");
  const layerId = "layerPolygon";
  const sourceId = "sourcePolygon";

  const doubleNumbers: [number, number][] = [];

  useEffect(() => {
    if (!map || !showInputs) return;

    const handleClick = (e: MapMouseEvent & object) => {
      const polygongenerate = document.getElementById(
        "polygongenerate"
      ) as HTMLInputElement;

      if (polygongenerate && !polygongenerate.checked) {
        doubleNumbers.length = 0;

        return;
      }

      doubleNumbers.push([e.lngLat.lng, e.lngLat.lat]);

      if (doubleNumbers.length > 2) {
        removePolygon();
        addSource();
        addLayer(parseFloat(polygonOpacity), polygonColor);
      }
    };

    const handleMouseMove = (e: maplibregl.MapMouseEvent) => {
      const polygongenerate = document.getElementById(
        "polygongenerate"
      ) as HTMLInputElement;
      if (polygongenerate && !polygongenerate.checked) {
        doubleNumbers.length = 0;
        return;
      }

      if (doubleNumbers.length === 3 || doubleNumbers.length === 5) {
        doubleNumbers.push([e.lngLat.lng, e.lngLat.lat]);
        removePolygon();
        addSource();
        addLayer(parseFloat(polygonOpacity), polygonColor);

        doubleNumbers.splice(doubleNumbers.length - 1, 1);
      }
    };

  map.on("click", handleClick);
  map.on("mousemove", handleMouseMove);

  return () => {
    map.off("click", handleClick);
    map.off("mousemove", handleMouseMove);
  };
}, [map, polygonOpacity, polygonColor, doubleNumbers]);

  const handlePolygonColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newColor = (event.target as HTMLInputElement).value;
    setPolygonColor(newColor);

    const polygongenerate = document.getElementById(
      "polygongenerate"
    ) as HTMLInputElement;
    if (polygongenerate && !polygongenerate.checked) {
      return;
    }

    if (map) {
      removePolygon();
      addSource();
      addLayer(parseFloat(polygonOpacity), newColor);
    }
    doubleNumbers.length = 0;
  };

  const handlePolygonOpacityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newOpacity = (event.target as HTMLInputElement).value;
    setPolygonOpacity(newOpacity);

    const polygongenerate = document.getElementById(
      "polygongenerate"
    ) as HTMLInputElement;
    if (polygongenerate && !polygongenerate.checked) {
      return;
    }

    if (map) {
      removePolygon();
      addSource();
      addLayer(parseFloat(newOpacity), polygonColor);
    }
    doubleNumbers.length = 0;
  };

  const handlePolygonCreateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreatePolygon(!createPolygon);
    doubleNumbers.length = 0;
  };

  function addSource() {
    if (map) {
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [doubleNumbers],
              },
              properties: {},
            },
          ],
        },
      });
    }
  }

  function addLayer(opacy: number, color: string) {
    if (map) {
      map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        layout: {},
        paint: {
          "fill-color": color,
          "fill-opacity": opacy,
        },
      });
    }
  }

  function removePolygon() {
    if (map) {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }

      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }
    }
  }

  const handleToggle = () => {
    setShowInputs((prev) => !prev);
  };

  return (
    <>
      <Button variant="contained" onClick={handleToggle}>
        {showInputs ? "Hide Polygon Editor" : "Show Polygon Editor"}
      </Button>

      {showInputs && (
        <Stack spacing={2}>
          <Typography variant="h6">Polygons</Typography>
          <FormControl>
            <FormLabel>Polygon Color</FormLabel>
            <RadioGroup
              color="primary"
              defaultValue="#9999"
              value={polygonColor}
              aria-label="Gray/Red/Green"
              onChange={handlePolygonColorChange}
            >
              <FormControlLabel
                control={<Radio />}
                value="#9999"
                label="Gray"
              ></FormControlLabel>
              <FormControlLabel
                control={<Radio />}
                value="#ff0000"
                label="Red"
              ></FormControlLabel>
              <FormControlLabel
                control={<Radio />}
                value="#00ff00"
                label="Green"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Polygon Opacity</FormLabel>
            <RadioGroup
              id="polygonOpacity"
              color="primary"
              defaultValue="0.6"
              value={polygonOpacity}
              aria-label="Gray/Red/Green"
              onChange={handlePolygonOpacityChange}
            >
              <FormControlLabel
                control={<Radio />}
                value="0.3"
                label="0.3"
              ></FormControlLabel>
              <FormControlLabel
                control={<Radio />}
                value="0.6"
                label="0.6"
              ></FormControlLabel>
              <FormControlLabel
                control={<Radio />}
                value="0.9"
                label="0.9"
              ></FormControlLabel>
            </RadioGroup>
          </FormControl>
        </Stack>
      )}
    </>
  );
}
