import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useMap } from "../context/MapInstanceContext";
import * as Layers from "../../static/layers/Layers"; // Import Layers
import { RemoveBoundaryLayerVisibility } from "../options/OptionsBorder";
// import { map } from "leaflet";

// Define the type for the layout property
type LayoutProperty = {
    "icon-image": [
      "step",
      ["zoom"],
      string,
      number,
      string
    ],
    "icon-size": number,
    "text-field"?: string,
    "text-font"?: string[],
    "text-size"?: number,
    "text-anchor"?: string,
    "text-radial-offset"?: number
  };

export default function MapContainer() {
  const location: [number, number] = [151.2093, -33.8688];
  
  const [mapReady, setMapReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLayer, setDraggedLayer] = useState<string | null>(null);
  const [labelName, setLabelName] = useState<string | null>(null);
  const [draggedFeatureId, setDraggedFeatureId] = useState<string | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Refs to store the current values of the states
  const isDraggingRef = useRef(isDragging);
  const draggedLayerRef = useRef(draggedLayer);
  const draggedFeatureIdRef = useRef(draggedFeatureId);
  const labelNameRef = useRef(labelName);
  const layerCreatedRef = useRef(false); // Flag to indicate layer creation

  const { setMap } = useMap();
  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!mapReady) return;

    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles",protocol.tile);

    const map = new maplibregl.Map({
      container: 'map',
      center: location,
      zoom: 10,
      style: "http://localhost:1810/osmdata/style.json"
    });

    mapRef.current = map; // Store map instance in ref

    const navControl = new maplibregl.NavigationControl({ visualizePitch: true });
    map.addControl(navControl, "top-left");

    map.on('load', () => {
      map.getStyle().layers.forEach((layer) => {
        // console.log(layer.id);
      })
      map.fitBounds([
        [32.958984, -5.353521],
        [43.50585, 5.615985]
      ]);

    Layers.AddLanduseLayers(map);
    
    Layers.AddWaterLayers(map);
      
    Layers.AddRoadOtherLayers(map);
      
    Layers.AddRoadBasicLayers(map);
      
    Layers.AddBoundaryLayers(map);
      
    Layers.AddRoadBridgeLayers(map);
      
    Layers.AddLabelsLayers(map);

    setMap(map);

    RemoveBoundaryLayerVisibility(map);
    });
  
  const nav = new maplibregl.NavigationControl({
    visualizePitch: true
  });
  map.addControl(nav, "top-left");

  // @ts-expect-error for debugging
  window.map = map;

  // map.on("click", (e) => {
  //   console.log(e);
  //   console.log([e.lngLat.lng, e.lngLat.lat]);
  //   console.log(map.flyTo({
  //     zoom: 5,
  //     center: [
  //       172.33918606365154, -43.10024434830323
  //   ],
  //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
  //   }));
  // });

  // map.on('zoom', () => {
  //   console.log('Current zoom level:', map.getZoom());
  // });

  map.on("mousedown", "places_locality", (e) => {
    e.preventDefault();
    if (e.features && e.features.length > 0) {
      const feature = e.features[0];
      if (feature.properties) {
        setIsDragging(true);
        setDraggedLayer(feature.layer.id);
        setLabelName(feature.properties.name);
        if (feature.id !== undefined) {
          setDraggedFeatureId(feature.id.toString());
          draggedFeatureIdRef.current = feature.id.toString();
        }
         // Update refs
         labelNameRef.current = feature.properties.name;
         isDraggingRef.current = true;
         draggedLayerRef.current = feature.layer.id;
                  
        console.log("Drag started for Sydney label");
      }
    }
  });

  map.on("mousemove", (e) => {
    if (!isDraggingRef.current || !draggedLayerRef.current || !draggedFeatureIdRef.current) return;

    console.log("mousemove event triggered");
    const newCoordinates = map.unproject([e.point.x, e.point.y]).toArray();
    console.log("Dragging Sydney label to:", newCoordinates);
    if (draggedLayerRef.current && labelNameRef.current) {
      updateLabelsOthersJson(draggedLayerRef.current, newCoordinates, map, labelNameRef.current); 
      }
    }
  );

  map.on("mouseup", () => {
    console.log("mouseup event triggered");
    if (!isDraggingRef.current) return;

    setIsDragging(false);
    setDraggedLayer(null);
    setDraggedFeatureId(null);
    setLabelName(null);

    draggedFeatureIdRef.current = null;
    isDraggingRef.current = false;
    draggedLayerRef.current = null;  
    layerCreatedRef.current = false; // Reset the flag
  });

}, [mapReady, setMap]);

// Add useEffect hooks to monitor state changes
useEffect(() => {
  console.log("isDragging changed:", isDragging);
}, [isDragging]);

useEffect(() => {
  console.log("draggedLayer changed:", draggedLayer);
}, [draggedLayer]);

useEffect(() => {
  console.log("draggedFeatureId changed:", draggedFeatureId);
}, [draggedFeatureId]);


const updateLabelsOthersJson = (layerId: string, newCoordinates: [number, number], map: maplibregl.Map, labelName: string) => {
  // Check if a layer for the specific label already exists
  const existingLayer = map.getLayer(`${labelName}_label`);

  // Replace with actual center point of label
  const centerPoint: [number, number] = [151.2093, -33.8688]; 

  // Calculate the distance between the center point and the new coordinates
  const distance = Math.sqrt(
    Math.pow(newCoordinates[0] - centerPoint[0], 2) +
    Math.pow(newCoordinates[1] - centerPoint[1], 2)
  );

  if (existingLayer || layerCreatedRef.current) 
  {
    const distanceAndRadialOffset = 0.4 + distance;

    // Update the text-radial-offset and text-anchor properties for the specific label
    map.setLayoutProperty(`${labelName}_label`, 'text-radial-offset', distanceAndRadialOffset);

    console.log(`Updated ${labelName}_label layer`);
  } 
  else 
  {
    const layer = map.getLayer("places_locality");

    // This code procs the error for "as" component, but currently unresolved
    const layoutProperty = layer ? (layer.getLayoutProperty("layout") as LayoutProperty) : {};
    
    // Create a new layer for the specific label, currently creates red color font, for clarification
    map.addLayer({
      "id": `${labelName}_locality`,
        "type": "symbol",
        "source": "protomaps",
        "source-layer": "places",
        "filter": [
            "all",
            ["==", "name", `${labelName}`]
        ],
        "layout": {
            ...layoutProperty,
        },
        "paint": {
            "text-color": "#ed3232",
            "text-halo-color": "#e0e0e0",
            "text-halo-width": 1,
            "text-halo-blur": 1
        }
    });

    // Update the filter property of the places_locality layer
    const currentFilter = map.getLayoutProperty("places_locality", 'filter');
    const updatedFilter = [...currentFilter, ["!=", "name", labelName]];
    map.setLayoutProperty("places_locality", 'filter', updatedFilter);

    console.log(updatedFilter);

    // Set the flag to indicate the layer has been created
    layerCreatedRef.current = true;

    console.log(`Created new layer for ${labelName}`);
  }
};

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}