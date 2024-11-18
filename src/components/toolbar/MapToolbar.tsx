import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import { services } from '@tomtom-international/web-sdk-services';
import CountryLanguageSelector from "./CountryLanguageSelector";
import IconSelector from "./IconSelector";
import PolygonMenu from "./PolygonMenu";

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
        const latitude = response.results[0]?.position?.lat as number;
        const longitude = response.results[0]?.position?.lng as number;
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
              const mapCanvas = map.getCanvas();

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
            const layerId = "water";

            const currentVisibility = map.getLayoutProperty(layerId, "visibility");
            
            if (currentVisibility === "visible") {
                map.setLayoutProperty(layerId, "visibility", "none");
            } else if (currentVisibility === "none") {
                map.setLayoutProperty(layerId, "visibility", "visible");
            }
          }
        }}
      >
        Show/Hide water
      </AxisButton>
      <CountryLanguageSelector />
      <IconSelector />
      {/* <AxisButton onClickFunction={() => {
          if (map) {
            const visibility = map.getLayer('boundaries_national').visibility;
            map.getLayer('boundaries_national').visibility = visibility === 'visible' ? 'none' : 'visible';
            
          }
        }}>
        Show/Hide national borders
      </AxisButton> */}
    <PolygonMenu></PolygonMenu>
    </Stack>
  );
}
