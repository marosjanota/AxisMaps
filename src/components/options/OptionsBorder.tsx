import * as React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { BorderType } from "../../enum/BorderType";
import { useMapOptions } from "../context/MapOptionsContext";
import { useMap } from "../context/MapInstanceContext";


export default function OptionsBorder() {
  const { borderType, setBorderType } = useMapOptions();
  const { map } = useMap();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!map)
      return;
    
    setBorderType(event.target.value as BorderType);

    switch(event.target.value as BorderType) {
      case BorderType.National:
        NationalBoundaryLayerVisibility(map, true);
        RegionalBoundaryLayerVisibility(map, false);
        LocalBoundaryLayerVisibility(map, false);
        TownBoundaryLayerVisibility(map, false);
        break;
      case BorderType.Regional:
        NationalBoundaryLayerVisibility(map, true);
        RegionalBoundaryLayerVisibility(map, true);
        LocalBoundaryLayerVisibility(map, false);
        TownBoundaryLayerVisibility(map, false);
        break;
      case BorderType.Local:
        NationalBoundaryLayerVisibility(map, true);
        RegionalBoundaryLayerVisibility(map, true);
        LocalBoundaryLayerVisibility(map, true);
        TownBoundaryLayerVisibility(map, false);
        break;
      case BorderType.Town:
        NationalBoundaryLayerVisibility(map, true);
        RegionalBoundaryLayerVisibility(map, true);
        LocalBoundaryLayerVisibility(map, true);
        TownBoundaryLayerVisibility(map, true);
        break;
      case BorderType.None:
        RemoveBoundaryLayerVisibility(map);
    }
    map.triggerRepaint();
  };

  return (
    <FormControl>
      <FormLabel>Border</FormLabel>
      <RadioGroup
        color="primary"
        defaultValue={BorderType.None}
        value={borderType}
        aria-label="Border Type"
        onChange={handleChange}
      >
        <FormControlLabel
          control={<Radio />}
          value={BorderType.National}
          label="National"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value={BorderType.Regional}
          label="Regional"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value={BorderType.Local}
          label="Local"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value={BorderType.Town}
          label="Town"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value={BorderType.None}
          label="None"
        ></FormControlLabel>
      </RadioGroup>
    </FormControl>
  );
}


function NationalBoundaryLayerVisibility(map: maplibregl.Map, visible: boolean) {
  map.setLayoutProperty('boundaries_national', 'visibility', visible ? 'visible' : 'none');
}

function RegionalBoundaryLayerVisibility(map: maplibregl.Map, visible: boolean) {
  map.setLayoutProperty('boundaries_regional', 'visibility', visible ? 'visible' : 'none');
}

function LocalBoundaryLayerVisibility(map: maplibregl.Map, visible: boolean) {
  map.setLayoutProperty('boundaries_local', 'visibility', visible ? 'visible' : 'none');
}

function TownBoundaryLayerVisibility(map: maplibregl.Map, visible: boolean) {
  map.setLayoutProperty('boundaries_town', 'visibility', visible ? 'visible' : 'none');
}

export function RemoveBoundaryLayerVisibility(map: maplibregl.Map) {
  NationalBoundaryLayerVisibility(map, false);
  RegionalBoundaryLayerVisibility(map, false);
  LocalBoundaryLayerVisibility(map, false);
  TownBoundaryLayerVisibility(map, false);
}



