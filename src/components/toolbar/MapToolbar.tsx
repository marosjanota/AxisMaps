import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import { services } from '@tomtom-international/web-sdk-services';
import CountryLanguageSelector from "./CountryLanguageSelector";
import IconSelector from "./IconSelector";

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
    </Stack>
  );
}
