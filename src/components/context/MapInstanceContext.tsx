import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Map } from 'maplibre-gl';

interface MapContextProps {
  map: Map | null;
  setMap: Dispatch<SetStateAction<Map | null>>;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = (): MapContextProps => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};