import { useEffect, useState } from "react";
import { useMap } from "./context/MapInstanceContext";
import bordersGeoJson from "../static/layers/NationalBorders.json";
import Button from "@mui/material/Button";
import React from "react";
import { Box } from "@mui/material";

const MapHoverEffect: React.FC = () => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [selectedStateIds, setSelectedStateIds] = useState<Set<string>>(
    new Set()
  );
  const [isFeatureEnabled, setIsFeatureEnabled] = useState<boolean>(false);
  const { map } = useMap();
  const sourceLayerName = "boundaries";

  useEffect(() => {
    if (!map) return;

    const extractGeoJsonAndAddLayer = () => {
      try {
        const geoJson: GeoJSON.FeatureCollection =
          bordersGeoJson as GeoJSON.FeatureCollection;

        if (!map.getSource(sourceLayerName)) {
          map.addSource(sourceLayerName, {
            type: "geojson",
            data: geoJson,
          });
        }

        if (!map.getLayer("boundary-fills")) {
          map.addLayer({
            id: "boundary-fills",
            type: "fill",
            source: sourceLayerName,
            layout: {},
            paint: {
              "fill-color": [
                "case",
                ["boolean", ["feature-state", "selected"], false], // Check if selected
                "#FF0000", // Permanent selection color
                ["boolean", ["feature-state", "hover"], false], // Check if hovered
                "#627BC1", // Hover color
                "#000000", // Default color
              ],
              "fill-opacity": 0.5,
            },
          });
        }

        if (!map.getLayer("boundary-borders")) {
          map.addLayer({
            id: "boundary-borders",
            type: "line",
            source: sourceLayerName,
            layout: {},
            paint: {
              "line-color": "#627BC1",
              "line-width": 2,
            },
          });
        }
      } catch (error) {
        console.error("Failed to query features:", error);
      }
    };

    const handleMouseMove = (e: any) => {
      if (e.features.length > 0) {
        const featureId = e.features[0].id;

        if (hoveredStateId) {
          map.setFeatureState(
            { source: sourceLayerName, id: hoveredStateId },
            { hover: false }
          );
        }

        setHoveredStateId(featureId);
        map.setFeatureState(
          { source: sourceLayerName, id: featureId },
          { hover: true }
        );
      }
    };

    const handleMouseLeave = () => {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: sourceLayerName, id: hoveredStateId },
          { hover: false }
        );
      }
      setHoveredStateId(null);
    };

    const handleClick = (e: any) => {
      if (e.features.length > 0) {
        const featureId = e.features[0].id;

        setSelectedStateIds((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(featureId)) {
            newSet.delete(featureId);
            map.setFeatureState(
              { source: sourceLayerName, id: featureId },
              { selected: false }
            );
          } else {
            newSet.add(featureId);
            map.setFeatureState(
              { source: sourceLayerName, id: featureId },
              { selected: true }
            );
          }
          return newSet;
        });
      }
    };

    const removeLayersAndSource = () => {
      if (map.getLayer("boundary-fills")) {
        map.removeLayer("boundary-fills");
      }
      if (map.getLayer("boundary-borders")) {
        map.removeLayer("boundary-borders");
      }
      if (map.getSource(sourceLayerName)) {
        map.removeSource(sourceLayerName);
      }
    };

    if (isFeatureEnabled) {
      extractGeoJsonAndAddLayer();
      map.on("mousemove", "boundary-fills", handleMouseMove);
      map.on("mouseleave", "boundary-fills", handleMouseLeave);
      map.on("click", "boundary-fills", handleClick);
    } else {
      map.off("mousemove", "boundary-fills", handleMouseMove);
      map.off("mouseleave", "boundary-fills", handleMouseLeave);
      map.off("click", "boundary-fills", handleClick);
      removeLayersAndSource();
    }

    return () => {
      map.off("mousemove", "boundary-fills", handleMouseMove);
      map.off("mouseleave", "boundary-fills", handleMouseLeave);
      map.off("click", "boundary-fills", handleClick);
    };
  }, [map, isFeatureEnabled, hoveredStateId, selectedStateIds]);

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
      <Button
        variant="contained"
        color={isFeatureEnabled ? "secondary" : "primary"}
        onClick={() => setIsFeatureEnabled((prev) => !prev)}
      >
        {isFeatureEnabled ? "Disable Hover Effect" : "Enable Hover Effect"}
      </Button>
    </Box>
  );
};

export default MapHoverEffect;
