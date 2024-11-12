import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import {  useMap } from "../context/MapInstanceContext";
import * as Layers from "../../static/layers/Layers";
import { RemoveBoundaryLayerVisibility } from "../options/OptionsBorder";

export default function MapContainer() {
  const location: [number, number] = [151.2093, -33.8688];
  
  const [mapReady, setMapReady] = useState(false);

  const { setMap } = useMap();
  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!mapReady) return;


    let protocol = new Protocol();
    maplibregl.addProtocol("pmtiles",protocol.tile);

    const map = new maplibregl.Map({
      container: "myMap",
      center: location,
      zoom: 0,
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
      map.getStyle().layers.forEach((layer) => {
        
        // // console.log(layer.id);
      }
      );
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

    map.on("click", (e) => {
      console.log(e);
      console.log([e.lngLat.lng, e.lngLat.lat]);
      console.log(map.flyTo({
        zoom: 5,
        center: [
          172.33918606365154, -43.10024434830323
      ],
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      }));
    });

    map.on('zoom', () => {
      console.log('Current zoom level:', map.getZoom());
    });

  }, [mapReady, setMap]);

  return (
      <Box sx={{ flex: 1 }}>
        <div id="myMap" style={{ height: '100%', width: '100%' , position: 'relative'}} />
      </Box>
  );
}
