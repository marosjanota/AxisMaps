import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import { services } from '@tomtom-international/web-sdk-services';
import CountryLanguageSelector from "./CountryLanguageSelector";

export default function BasicButtonGroup() {
  const { map } = useMap();

  const MOMTOM_API_KEY = "3511aLbdzJWwIOPGg5PxuE6AAARooszw";

  const search = (): void => {
    if(!map)
      return;

    const query = document.getElementById('search') as HTMLInputElement;
    console.log("Search ", query.value)
    if (query.value === '') return;
    services.fuzzySearch({
      key: MOMTOM_API_KEY,
      query: query.value,
    }).then((response) => {
      if (response && response.results && response.results.length > 0) {
        let latitude = response.results[0]?.position?.lat as number;
        let longitude = response.results[0]?.position?.lng as number;
        console.log("latitude ", latitude);
        console.log("longitude ", longitude);
        map.setCenter({lng: longitude, lat:latitude} )
        map.zoomTo(14, {duration: 4000});
      }
    });
  }

  const doubleNumbers: [number, number][] = [];

  if (map) {

    // map click
    map.on("click", (e: maplibregl.MapMouseEvent) => {
      const polygongenerate = document.getElementById('polygongenerate') as HTMLInputElement;
      if (!polygongenerate.checked) {
        doubleNumbers.length = 0;
        console.log(map.flyTo({
          zoom: 5,
          center: [
            172.33918606365154, -43.10024434830323
          ],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        }));

        return;
      }

      const polygoncolor = document.getElementById('polygoncolor') as HTMLInputElement;
      console.log("polygoncolor ", polygoncolor.value)
      const polygonopacity = document.getElementById('polygonopacity') as HTMLInputElement;
      console.log("polygonopacity ", polygonopacity.value)
      const opacity = parseFloat(polygonopacity.value);
      console.log(e);
      console.log([e.lngLat.lng, e.lngLat.lat]);
      doubleNumbers.push([e.lngLat.lng, e.lngLat.lat]);
      console.log('style', map.getStyle());

      if (doubleNumbers.length > 2) {
        if (map.getLayer('maine2')) {
          console.log('removeLayer maine2');
          map.removeLayer('maine2');
        }

        if (map.getSource('maine2')) {
          console.log('removeSource maine2');
          map.removeSource('maine2');
        }

        map.addSource('maine2', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    doubleNumbers
                  ]
                },
                "properties": {}
              }
            ]
          }
        });

        map.addLayer({
          'id': 'maine2',
          'type': 'fill',
          'source': 'maine2',
          'layout': {},
          'paint': {
            'fill-color': polygoncolor.value,
            'fill-opacity': opacity
          }
        });
      }      
    }); // map click


    // map mousemove
    map.on("mousemove", (e: maplibregl.MapMouseEvent) => {
      const polygongenerate = document.getElementById('polygongenerate') as HTMLInputElement;
      console.log("polygongenerate ", polygongenerate.checked)
      if (!polygongenerate.checked)
      {
           doubleNumbers.length = 0;
           return;
      }

      if (doubleNumbers.length === 3 || doubleNumbers.length === 5) {
        const polygoncolor = document.getElementById('polygoncolor') as HTMLInputElement;
        console.log("polygoncolor ", polygoncolor.value)
        doubleNumbers.push([e.lngLat.lng, e.lngLat.lat]);

        if (map.getLayer('maine2')) {
          console.log('removeLayer maine2');
          map.removeLayer('maine2');
        }

        if (map.getSource('maine2')) {
          console.log('removeSource maine2');
          map.removeSource('maine2');
        }

        map.addSource('maine2', {
          'type': 'geojson',
          'data': {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                    doubleNumbers
                  ]
                },
                "properties": {}
              }
            ]
          }
        });

        map.addLayer({
          'id': 'maine2',
          'type': 'fill',
          'source': 'maine2',
          'layout': {},
          'paint': {
            'fill-color': polygoncolor.value,
            'fill-opacity': 0.8
          }
        });

        doubleNumbers.splice(doubleNumbers.length - 1, 1);
      }

    }); // map mousemove
  }




  return (
    <Stack spacing={2}>
      <Typography variant="h6">Map toolbar</Typography>
      <input type="text" id="search" />
      <AxisButton onClickFunction={() => search()}>
        Search
      </AxisButton>
      <AxisButton onClickFunction={() => console.log("Zoom In")}>
        Zoom In
      </AxisButton>
      <AxisButton onClickFunction={() => console.log("Zoom Out")}>
        Zoom Out
      </AxisButton>
      <Divider />
      <AxisButton onClickFunction={() => console.log("Reset map")}>
        Reset Map
      </AxisButton>
      <AxisButton
        onClickFunction={() => {
          if (map) {
            map.once("render", () => {
              var mapCanvas = map.getCanvas();

              const img = mapCanvas.toDataURL("image/png");
              fetch(img)
                .then((res) => res.blob())
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "map.png";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  // URL.revokeObjectURL(url);
                });
            });
            map.triggerRepaint();
          }
        }}
      >
        Assemble Map
      </AxisButton>
      <AxisButton
        onClickFunction={() => {
          if (map) {
            // @ts-ignore
            const visibility = map.getLayer("water").visibility;
            // @ts-ignore
            map.getLayer("water").visibility =
              visibility === "visible" ? "none" : "visible";
            map.triggerRepaint();
          }
        }}
      >
        Show/Hide water
      </AxisButton>
      <CountryLanguageSelector />
      {/* <AxisButton onClickFunction={() => {
          if (map) {
            const visibility = map.getLayer('boundaries_national').visibility;
            map.getLayer('boundaries_national').visibility = visibility === 'visible' ? 'none' : 'visible';
            
          }
        }}>
        Show/Hide national borders
      </AxisButton> */}
      <Typography variant="h6">Polygons</Typography>
      <input type="checkbox" id="polygongenerate" />
      {/* <FormControlLabel id="polygongenerate2" control={<Checkbox />} label="Generate polynom" /> */}
      <input type="text" id="polygoncolor" defaultValue={"#9999"} />
      <input type="text" id="polygonopacity" defaultValue={"0.8"} />
    </Stack>
  );
}
