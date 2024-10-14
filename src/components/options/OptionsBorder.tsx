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

export default function OptionsBorder() {
  const { borderType, setBorderType } = useMapOptions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBorderType(event.target.value as BorderType);
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
