import * as React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function OptionsRaiseSpotlightLabel() {
  const [rsl, setRSL] = React.useState("national");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRSL((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <FormLabel>Raise/Spotlight/Label</FormLabel>

      <RadioGroup
        color="primary"
        defaultValue="national"
        value={rsl}
        aria-label="Raise/Spotlight/Label"
        onChange={handleChange}
      >
        <FormControlLabel
          control={<Radio />}
          value="national"
          label="National"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value="regional"
          label="Regional"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value="local"
          label="Local"
        ></FormControlLabel>
        <FormControlLabel
          control={<Radio />}
          value="town"
          label="Town"
        ></FormControlLabel>
      </RadioGroup>
    </FormControl>
  );
}
