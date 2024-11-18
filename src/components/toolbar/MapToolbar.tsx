import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import CountryLanguageSelector from "./CountryLanguageSelector";
import IconSelector from "./IconSelector";
import PolygonMenu from "./PolygonMenu";
import SearchMenu from "./SearchMenu";

export default function BasicButtonGroup() {
  const { map } = useMap();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Map toolbar</Typography>
      <SearchMenu></SearchMenu>
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
