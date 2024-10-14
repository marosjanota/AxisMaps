import React from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function MapContainer() {
  const location: [number, number] = [49.62742059869097, 16.036930156908028];

  return (
    <Box sx={{ flex: 1 }}>
      <LeafletMap style={{ height: "100%", width: "100%" }}>
        <ChangeView center={location} zoom={17} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={location}>
          <Popup>Tu sa spolu opijeme!</Popup>
        </Marker>
      </LeafletMap>
    </Box>
  );
}
