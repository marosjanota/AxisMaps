import React, { useState } from "react";
import countryLanguages from "../../static/country_codes.json";
import { useMap } from "../context/MapInstanceContext";
import {
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface CountryLanguages {
  [country: string]: string;
}

const CountryLanguageSelector: React.FC = () => {
  const { map } = useMap();
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const country = event.target.value;
    setSelectedCountry(country);

    const languages = (countryLanguages as CountryLanguages)[country];
    const primaryLanguage = languages.split(",")[0].trim();
    map.setLayoutProperty("places_country", "text-field", [
      "get",
      `name:${primaryLanguage}`,
    ]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 300,
        mx: "auto",
        mt: 4,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="country-selector-label">Select Localization</InputLabel>
        <Select
          labelId="country-selector-label"
          id="country-selector"
          value={selectedCountry}
          onChange={handleCountryChange}
          label="Select Localization"
        >
          {Object.keys(countryLanguages).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountryLanguageSelector;
