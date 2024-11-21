import React, { useState } from 'react';
import { Map } from 'maplibre-gl';
import AxisButton from '../AxisButton';

interface AreaLabelListPopupProps {
  map: Map | null;
  layerName: string;
  title: string;
}

const LayerListPopup: React.FC<AreaLabelListPopupProps> = ({ map, layerName, title}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [layers, setLayers] = useState<string[]>([]);
  const titleLabel = title; 

  const togglePopup = () => {
    if (!map) 
        return;
    if (!isVisible) {
      const placesLayer = map.queryRenderedFeatures({ layers: [layerName] });
      const visibleCities = placesLayer.filter(feature => feature.properties.name)
      .map(feature => feature.properties["name:en"] || feature.properties.name) || [];
      setLayers(Array.from(new Set(visibleCities)));
    }
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <AxisButton onClickFunction={togglePopup}>
          Show {titleLabel}
      </AxisButton>
      {isVisible && (
        <div className="popup">
          <h3>{titleLabel}</h3>
          <ul className="area-list">
            {layers.map(layer => (
              <li key={layer}>{layer}</li>
            ))}
          </ul>
          <AxisButton onClickFunction={togglePopup}>Close</AxisButton>
        </div>
      )}
    </div>
  );
};

export default LayerListPopup;