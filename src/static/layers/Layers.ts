import boundariesData from './Boundaries.json'; // see https://osm-boundaries.com/map
import labelsBasicData from './LabelsBasic.json';
import labelsOthersData from './LabelsOthers.json';
import landuseData from './Landuse.json';
import roadsBasicData from './RoadsBasic.json';
import roadsBridgeData from './RoadsBridges.json';
import roadsOthersData from './RoadsOthers.json';
import roadsTunnelsData from './RoadsTunnels.json';
import waterBasicData from './WaterBasic.json';
import waterOthersData from './WaterStreamRivers.json';

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

export function AddLanduseLayers(map: any) {
    const landuses: Array<any> = landuseData;

    landuses.forEach((landuse: any) => {
        map.addLayer(landuse);
    });
};

export function AddWaterLayers(map: any) {
    map.addLayer(waterBasicData);
    const riversAndStreams: Array<any> = waterOthersData;

    riversAndStreams.forEach((riverAndStream: any) => {
        map.addLayer(riverAndStream);
    });
};

export function AddRoadOtherLayers(map: any) {
    const roadsOthers: Array<any> = roadsOthersData;
    const roadsTunnels: Array<any> = roadsTunnelsData;

    roadsOthers.forEach((road: any) => {
        map.addLayer(road);
    });
    roadsTunnels.forEach((road: any) => {
        map.addLayer(road);
    });
};

export function AddRoadBasicLayers(map: any) {
    const roads: Array<any> = roadsBasicData;

    roads.forEach((road: any) => {
        map.addLayer(road);
    });
};

export function AddBoundaryLayers(map: any) {
    const boundaries: Array<any> = boundariesData;

    boundaries.forEach((boundary: any) => {
        map.addLayer(boundary);
    });
};

export function AddRoadBridgeLayers(map: any) {
    const roads: Array<any> = roadsBridgeData;

    roads.forEach((road: any) => {
        map.addLayer(road);
    });
};

export function AddLabelsLayers(map: any) {
    const labelsBasic: Array<any> = labelsBasicData;
    const labelsOthers: Array<any> = labelsOthersData;

    labelsBasic.forEach((label: any) => {
        map.addLayer(label);
    });
    labelsOthers.forEach((label: any) => {
        map.addLayer(label);
    });
};
