import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";

export default function BasicButtonGroup() {
  const { map } = useMap();
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Map toolbar</Typography>

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
      <AxisButton onClickFunction={() => {
          if (map) {
            map.once('render', () => {
              var mapCanvas = map.getCanvas();
              
              const img = mapCanvas.toDataURL('image/png');
              fetch(img)
                .then(res => res.blob())
                .then(blob => {
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'map.png';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  // URL.revokeObjectURL(url);
                });
            });
            map.triggerRepaint();
          }
        }}>
        Assemble Map
      </AxisButton>
      <AxisButton onClickFunction={() => {
          if (map) {
            const visibility = map.getLayer('water').visibility;
            map.getLayer('water').visibility = visibility === 'visible' ? 'none' : 'visible';
            map.triggerRepaint();
          }
        }}>
        Show/Hide water
      </AxisButton>
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
