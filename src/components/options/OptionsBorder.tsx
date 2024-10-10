import * as React from 'react';
import {FormControl, FormLabel, FormControlLabel, RadioGroup, Radio} from '@mui/material';

export default function OptionsBorder() {
  const [borderType, setBorderType] = React.useState('local');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBorderType((event.target as HTMLInputElement).value);
  };

  return (
    
    <FormControl>
      <FormLabel>Border</FormLabel>

      <RadioGroup
        color="primary"
        defaultValue="local"
        value={borderType}
        aria-label="Border Type"
        onChange={handleChange}
      >
        <FormControlLabel control={<Radio />} value="national" label="National"></FormControlLabel>
        <FormControlLabel control={<Radio />} value="regional" label="Regional"></FormControlLabel>
        <FormControlLabel control={<Radio />} value="local" label="Local"></FormControlLabel>
        <FormControlLabel control={<Radio />} value="town" label="Town"></FormControlLabel>
        <FormControlLabel control={<Radio />} value="none" label="None"></FormControlLabel>
      </RadioGroup>
    </FormControl>
  );
}
