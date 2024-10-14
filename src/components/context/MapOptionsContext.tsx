import React, { createContext, useContext, useState, ReactNode } from "react";
import { BorderType } from "../../enum/BorderType";

interface MapOptions {
  borderType: BorderType;
  setBorderType: React.Dispatch<React.SetStateAction<BorderType>>;
}

const MapOptionsContext = createContext<MapOptions | undefined>(undefined);

const MapOptionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [borderType, setBorderType] = useState<BorderType>(BorderType.None);

  return (
    <MapOptionsContext.Provider value={{ borderType, setBorderType }}>
      {children}
    </MapOptionsContext.Provider>
  );
};

const useMapOptions = (): MapOptions => {
  const context = useContext(MapOptionsContext);
  if (!context) {
    throw new Error("Context is not set.");
  }
  return context;
};

export { MapOptionsProvider, useMapOptions };
