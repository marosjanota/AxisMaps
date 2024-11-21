import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import {  useMap } from "../context/MapInstanceContext";
import * as Layers from "../../static/layers/Layers";
import { RemoveBoundaryLayerVisibility } from "../options/OptionsBorder";

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
      // zoom: 15.5,
      
      // style: "http://10.0.0.97/staticmapsdata/fullstyle_ubuntu.json",
      // style: "http://localhost:1810/osmdata/style.json",
      style: "http://10.0.0.97/staticmapsdata/style.json",

      // example:
      // style: "https://demotiles.maplibre.org/style.json"
      // style: "http://openmaptiles.org/tilejson.json"
      //style: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
    //   style: {
    //     version: 8,
    //     glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
    //     sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",
    //     sources: {
    //         "protomaps": {
    //             type: "vector",
    //             url: "pmtiles://http://localhost:1810/osmdata/australia-oceania-latest.pmtiles",
    //             //       ^-- Remember to prefix the URL with pmtiles://
    //             attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    //         },
    //         "test": {
    //             type: "raster",
    //             url: "https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json",
    //             //       ^-- Remember to prefix the URL with pmtiles://
    //             // attribution: '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    //         }
    //     },
    //     layers:[
    //       {
    //         id: "background",
    //         type: "background",
    //         paint: {
    //             "background-color": "#D8F2FF"
    //         },
    //         "layout": {
    //             "visibility": "visible"
    //         },
    //         "maxzoom": 24
    //     }]
    // }
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

      setMap(map);

      RemoveBoundaryLayerVisibility(map);
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
