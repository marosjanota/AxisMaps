import React from "react";
import AxisButton from "../components/AxisButton";

interface MapWithLabelToggleProps {
  mapInstance: React.MutableRefObject<tt.Map | null>;
}

const LayerToggle: React.FC<MapWithLabelToggleProps> = ({ mapInstance }) => {
  const toggleVisibility = (layerId: string) => {
    if (mapInstance.current) {
      const currentVisibility = mapInstance.current.getLayoutProperty(
        layerId,
        "visibility"
      );

      const newVisibility =
        currentVisibility === "visible" ? "none" : "visible";

      mapInstance.current.setLayoutProperty(
        layerId,
        "visibility",
        newVisibility
      );
    }
  };

  const toggleLayersByFilter = (filterString: string) => {
    if (mapInstance.current) {
      const layers = mapInstance.current
        .getStyle()
        .layers.filter((l) =>
          l.id.toLowerCase().includes(filterString.toLowerCase())
        );

      layers.forEach((l) => toggleVisibility(l.id));
    }
  };

  const toggleRoads = () => {
    toggleLayersByFilter("road");
  };

  const toggleBorders = () => {
    toggleLayersByFilter("borders");
  };

  return (
    <div>
      <AxisButton
        onClickFunction={() => toggleVisibility("TransitLabels - Road")}
      >
        Toggle Street Label
      </AxisButton>
      <AxisButton onClickFunction={toggleRoads}>
        Toggle Road Visibility
      </AxisButton>
      <AxisButton onClickFunction={toggleBorders}>
        Toggle Border Visibility
      </AxisButton>
    </div>
  );
};

export default LayerToggle;
