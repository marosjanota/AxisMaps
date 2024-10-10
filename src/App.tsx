import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopNav from './components/layout/TopNav.tsx';
import LeftSidebar from './components/layout/LeftSidebar.tsx';
import RightSidebar from './components/layout/RightSidebar.tsx';
import MapContainer from './components/layout/MapContainer.tsx';
import Footer from './components/layout/Footer.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <CssBaseline />
        <TopNav />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <LeftSidebar />
          <MapContainer />
          <RightSidebar />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
