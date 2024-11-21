import * as React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import AxisButton from "../AxisButton";
import { useMap } from "../context/MapInstanceContext";
import CountryLanguageSelector from "./CountryLanguageSelector";
import IconSelector from "./IconSelector";
import PolygonMenu from "./PolygonMenu";
import SearchMenu from "./SearchMenu";
import LabelEditor from "./LabelEditor";
import * as Layers from "../../static/layers/Layers";
import { RemoveBoundaryLayerVisibility } from "../options/OptionsBorder";

export default function BasicButtonGroup() {
  const { map } = useMap();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Map toolbar</Typography>
      <SearchMenu></SearchMenu>
      <AxisButton onClickFunction={() => {
        map?.setZoom(map?.getZoom() + 0.5);
      }}>
        Zoom In
      </AxisButton>
      <AxisButton onClickFunction={() => {
        map?.setZoom(map?.getZoom() - 0.5);
      }}>
        Zoom Out
      </AxisButton>
      <Divider />
      <AxisButton onClickFunction={() => {
        map?.getStyle().layers?.forEach((layer) => {
          if (!["background", "earth", "buildings"].includes(layer.id))
          {
            map?.removeLayer(layer.id);
          }
        });

        map?.setCenter([-74.0149, 40.7110]);
        map?.setZoom(0);
        map?.setBearing(0);
        map?.setPitch(0);
        Layers.AddLandcoverLayers(map!);
        Layers.AddLanduseLayers(map!);
        Layers.AddWaterLayers(map!);
        Layers.AddRoadOtherLayers(map!);
        Layers.AddRoadBasicLayers(map!);
        Layers.AddBoundaryLayers(map!);
        Layers.AddRoadBridgeLayers(map!);
        Layers.AddLabelsLayers(map!);
        RemoveBoundaryLayerVisibility(map!);
      }}>
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
      <LabelEditor />
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
