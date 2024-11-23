import { useEffect, useState } from "react";
import { useMap } from "./context/MapInstanceContext";
import bordersGeoJson from '../static/layers/NationalBorders.json';

const MapHoverEffect: React.FC = () => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const { map } = useMap();
  const sourceLayerName = "boundaries"; 

  useEffect(() => {
    if (!map) return;

    console.log("STATE ID", hoveredStateId)

     const extractGeoJsonAndAddLayer = () => {
      try {
        const features = map.querySourceFeatures("protomaps", {
          sourceLayer: sourceLayerName,
        });

        // Convert features to GeoJSON format
        // const geoJson: GeoJSON.FeatureCollection = {
        //   type: "FeatureCollection",
        //   features: features.map((feature) => feature.toJSON()),
        // };

        const geoJson: GeoJSON.FeatureCollection = bordersGeoJson as GeoJSON.FeatureCollection
        console.log("Extracted GeoJSON:", geoJson); // For debugging

        if (map.getSource(sourceLayerName)) {
          //map.getSource("boundaries")!.setData(geoJson);
        } else {
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
              "fill-color": "#627BC1",
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                1, 
                0.5, 
              ],
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

    map.on("idle", extractGeoJsonAndAddLayer);

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

    map.on("mousemove", "boundary-fills", handleMouseMove);
    map.on("mouseleave", "boundary-fills", handleMouseLeave);

    return () => {
      console.log("unmounted")
      map.off("idle", extractGeoJsonAndAddLayer);
      map.off("mousemove", "boundary-fills", handleMouseMove);
      map.off("mouseleave", "boundary-fills", handleMouseLeave);
    };
  }, [map, hoveredStateId]);

  return null; 
};

export default MapHoverEffect;