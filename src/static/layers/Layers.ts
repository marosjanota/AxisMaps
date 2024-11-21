import boundariesData from './Boundaries.json'; // see https://osm-boundaries.com/map
import labelsBasicData from './normalizedLayers/LabelsBasic_normalized_fonts.json';
import labelsOthersData from './normalizedLayers/LabelsOther_normalized_fonts.json';
import landuseData from './Landuse.json';
import roadsBasicData from './RoadsBasic.json';
import roadsBridgeData from './RoadsBridges.json';
import roadsOthersData from './RoadsOthers.json';
import roadsTunnelsData from './RoadsTunnels.json';
import waterBasicData from './WaterBasic.json';
import waterOthersData from './WaterStreamRivers.json';
import { AddLayerObject, Map } from 'maplibre-gl';
import landcoverData from './Landcover.json';

// *Landcover
// *Landuse
// *roads (runway/taxi) - roadsOthers
// landuse (runway/taxi)
// *water
// *water rest
// landuse pedestrian/pier
// *roads  tunnels
// buildings
// *roads
// *boundaries
// *roads bridges
// *labels (water,roads)
// *pois
// *places

export function AddLandcoverLayers(map: Map) {
    landcoverData.forEach((landcover) => {
        map.addLayer(landcover as AddLayerObject);
    });
};

export function AddLanduseLayers(map: Map) {
    landuseData.forEach((landuse) => {
        map.addLayer(landuse as AddLayerObject);
    });
}

export function AddWaterLayers(map: Map) {
    map.addLayer(waterBasicData as AddLayerObject);

    waterOthersData.forEach((riverAndStream) => {
        map.addLayer(riverAndStream as AddLayerObject);
    });
};

export function AddRoadOtherLayers(map: Map) {
    roadsOthersData.forEach((road) => {
        map.addLayer(road as AddLayerObject);
    });

    roadsTunnelsData.forEach((road) => {
        map.addLayer(road as AddLayerObject);
    });
};

export function AddRoadBasicLayers(map: Map) {
    roadsBasicData.forEach((road) => {
        map.addLayer(road as AddLayerObject);
    });
};

export function AddBoundaryLayers(map: Map) {
    boundariesData.forEach((boundary) => {
        map.addLayer(boundary as AddLayerObject);
    });
};

export function AddRoadBridgeLayers(map: Map) {
    roadsBridgeData.forEach((road) => {
        map.addLayer(road as AddLayerObject);
    });
};

export function AddLabelsLayers(map: Map) {
    labelsBasicData.forEach((label) => {
        map.addLayer(label as AddLayerObject);
    });

    labelsOthersData.forEach((label) => {
        map.addLayer(label as AddLayerObject);
    });
};
