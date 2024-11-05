import React, {useState} from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopNav from "./components/layout/TopNav";
import LeftSidebar from "./components/layout/LeftSidebar";
import RightSidebar from "./components/layout/RightSidebar";
import MapContainer from "./components/layout/MapContainer";
import Footer from "./components/layout/Footer";
import { MapOptionsProvider } from "./components/context/MapOptionsContext";
import { MapProvider } from "./components/context/MapInstanceContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <MapOptionsProvider>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
          <CssBaseline />
          <TopNav />
          <Box sx={{ display: "flex", flex: 1 }}>
            <MapProvider>
              <LeftSidebar />
              <MapContainer />
              <RightSidebar />
            </MapProvider>
          </Box>
          <Footer />
        </Box>
      </MapOptionsProvider>
    </ThemeProvider>
  );
}

export default App;
