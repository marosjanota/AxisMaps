        
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Stack } from '@mui/material';

export default function OptionsVisibility() {
  return (
    <FormGroup>
        <FormLabel >Visibility option</FormLabel>
        <Stack direction={'row'}>
            <Stack>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Locators" />
                <FormControlLabel control={<Checkbox />} label="Ferries" />
                <FormControlLabel control={<Checkbox />} label="Trains" />
                <FormControlLabel control={<Checkbox />} label="Street Labels" />
                <FormControlLabel control={<Checkbox />} label="Area Labels" />
            </Stack>
            <Stack>
                <FormControlLabel control={<Checkbox />} label="Routes" />
                <FormControlLabel control={<Checkbox />} label="Raise" />
                <FormControlLabel control={<Checkbox />} label="Spotlights" />
                <FormControlLabel control={<Checkbox />} label="Meridians" />
                <FormControlLabel control={<Checkbox />} label="Parallels" />
            </Stack>
        </Stack>
    </FormGroup>
  );
}
