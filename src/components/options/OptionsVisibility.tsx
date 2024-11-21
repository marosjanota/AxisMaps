import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormLabel, Stack } from "@mui/material";
import { useMap } from "../context/MapInstanceContext";
import AreaListPopup from "../toolbar/AreaLabesList";

export default function OptionsVisibility() {
  const { map } = useMap();

  const [visibility, setVisibility] = React.useState({
    locators: true,
    ferries: true,
    trains: true,
    streetLabels: true,
    areaLabels: true,
    waterAreaLabels: true,
    routes: false,
    raise: false,
    spotlights: false,
    meridians: false,
    parallels: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setVisibility((prev) => ({ ...prev, [name]: checked }));
    switch (name) {
      case "locators":
        setLayerVisibility(checked, "locators");
        break;
      case "ferries":
        setLayerVisibility(checked, "roads_ferries");
        break;
      case "trains":
        setLayerVisibility(checked, "roads_rail");
        break;
      case "streetLabels":
        setLayerVisibility(checked, "roads_labels_minor");
        setLayerVisibility(checked, "roads_labels_major");
        break;
      case "areaLabels":
        setLayerVisibility(checked, "pois");
        setLayerVisibility(checked, "places_subplace");
        setLayerVisibility(checked, "pois");
        setLayerVisibility(checked, "places_locality");
        setLayerVisibility(checked, "places_region");
        setLayerVisibility(checked, "places_country");
        break;
      case "waterAreaLabels":
          setLayerVisibility(checked, "water_waterway_label");
          setLayerVisibility(checked, "water_label_ocean");
          setLayerVisibility(checked, "water_label_lakes");
          break;
      case "default":
        setLayerVisibility(checked, name);
        break;
    }
  };

  return (
    <FormGroup>
      <FormLabel>Visibility option</FormLabel>
      <Stack direction={"row"}>
        <Stack>
          <FormControlLabel
            control={<Checkbox checked={visibility.locators} onChange={handleChange} name="locators" />}
            label="Locators"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.ferries} onChange={handleChange} name="ferries" />}
            label="Ferries"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.trains} onChange={handleChange} name="trains" />}
            label="Trains"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.streetLabels} onChange={handleChange} name="streetLabels" />}
            label="Street Labels"
          />
          <AreaListPopup map={map} layerName='roads_labels_major' title="Streets list" />
          <FormControlLabel
            control={<Checkbox checked={visibility.areaLabels} onChange={handleChange} name="areaLabels" />}
            label="Area Labels"
          />
          <AreaListPopup map={map} layerName='places_locality' title="Cities list" />
          <FormControlLabel
            control={<Checkbox checked={visibility.waterAreaLabels} onChange={handleChange} name="waterAreaLabels" />}
            label="Water Area Labels"
          />
        </Stack>
        <Stack>
          <FormControlLabel
            control={<Checkbox checked={visibility.routes} onChange={handleChange} name="routes" />}
            label="Routes"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.raise} onChange={handleChange} name="raise" />}
            label="Raise"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.spotlights} onChange={handleChange} name="spotlights" />}
            label="Spotlights"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.meridians} onChange={handleChange} name="meridians" />}
            label="Meridians"
          />
          <FormControlLabel
            control={<Checkbox checked={visibility.parallels} onChange={handleChange} name="parallels" />}
            label="Parallels"
          />
        </Stack>
      </Stack>
    </FormGroup>
  );

  function setLayerVisibility(checked: boolean, name: string) {
    if (!map)
      return;
    if (checked) {
      map.setLayoutProperty(name, "visibility", "visible");
    } else {
      map.setLayoutProperty(name, "visibility", "none");
    }
  }
}
