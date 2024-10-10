import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';

export default function MapContainer() {

  const location = [49.62742059869097, 16.036930156908028];

  return (
    <Box sx={{ flex: 1 }}>
      <LeafletMap center={location} zoom={17} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         <Marker position={location}>
          <Popup>
            Tu sa spolu opijeme!
          </Popup>
        </Marker>
      </LeafletMap>
    </Box>
  );
}
