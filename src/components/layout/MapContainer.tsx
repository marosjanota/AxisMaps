import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import maplibregl from 'maplibre-gl';
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";

export default function MapContainer() {
  const location: [number, number] = [151.2093, -33.8688];
  

  const [mapReady, setMapReady] = useState(false);

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
      style: "http://localhost:1810/osmdata/style.json",


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

      // example: add custom source
      // map.addSource('myPMTileSource', {
      //   type: 'vector',
      //   url: 'pmtiles://http://localhost:1810/osmdata/australia-oceania-latest.pmtiles'
      // });

      // example: add custom layer
      // map.addLayer({
      //   'id': 'boundary',
      //   'source': 'protomaps',
      //   'source-layer': 'boundary',
      //   'type': 'line',
      //   'paint': {
      //       'line-color': 'red'
      //   }
      // });
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
    });

  }, [mapReady]);

  return (
    <Box sx={{ flex: 1 }}>
      <div id="myMap" style={{ height: '100%', width: '100%' , position: 'relative'}} />
    </Box>
  );
}