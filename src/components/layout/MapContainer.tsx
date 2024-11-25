import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import {  useMap } from "../context/MapInstanceContext";
import * as Layers from "../../static/layers/Layers";
import { RemoveBoundaryLayerVisibility } from "../options/OptionsBorder";
import MaplibreTerradrawControl from '@watergis/maplibre-gl-terradraw';
import '@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css';

export default function MapContainer() {
  const location: [number, number] = [-74.0149, 40.7110];
  
  const [mapReady, setMapReady] = useState(false);

  const { setMap } = useMap();
  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!mapReady) return;

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: "myMap",
      center: location,
      style: "http://10.0.0.97/staticmapsdata/style.json",
    });

    map.on('load', () => {
      Layers.AddLandcoverLayers(map);
      
      Layers.AddLanduseLayers(map);
    
      Layers.AddWaterLayers(map);
      
      Layers.AddRoadOtherLayers(map);
      
      Layers.AddRoadBasicLayers(map);
      
      Layers.AddBoundaryLayers(map);
      
      Layers.AddRoadBridgeLayers(map);
      
      Layers.AddLabelsLayers(map);

      Layers.AddManhattanBuildingsLayer(map);

      setMap(map);

      RemoveBoundaryLayerVisibility(map);

      const drawControl = new MaplibreTerradrawControl({
          modes: ['render','point','linestring','polygon','rectangle','circle','freehand','angled-rectangle','sensor','sector','select','delete-selection','delete'],
          open: true,
      });
      map.addControl(drawControl, 'top-left');
      
      const drawInstance = drawControl.getTerraDrawInstance();
      
      drawInstance.on('select', (id) => {
        const snapshot = drawInstance.getSnapshot();
        const polygon = snapshot?.find((feature) => feature.id === id);
        console.log(polygon);
      });
    });
    
    const nav = new maplibregl.NavigationControl({
      visualizePitch: true
    });
    map.addControl(nav, "top-left");

    // @ts-expect-error for debugging
    window.map = map;

    map.on("click", (e) => {
      console.log(e);
      console.log('Current lng, lat:',[e.lngLat.lng, e.lngLat.lat]);
      console.log('Current style:', map.getStyle());
      console.log('Current zoom level:', map.getZoom());
      console.log('Current bounds:', map.getBounds());
      console.log('Current pitch:', map.getPitch());
      console.log('Current bearing:', map.getBearing());
      console.log('Current center:', map.getCenter());
      console.log('Current maxBounds:', map.getMaxBounds());
      console.log('Current maxZoom:', map.getMaxZoom());
      console.log('Current minZoom:', map.getMinZoom());
      console.log('Current transform:', map.transform);
      console.log('Current version:', map.version);
    });

  }, [mapReady, setMap]);

  return (
      <Box sx={{ flex: 1 }}>
        <div id="myMap" style={{ width: '100%' , height: '100%', position: 'relative'}} />
      </Box>
  );
}
