# Map Project Template

This is a React-based project template that uses Material-UI (MUI) and OpenStreetMap integration via `react-leaflet`.

## Installation

```
git clone https://github.com/marosjanota/AxisMaps.git
npm i
npm start || npm run build
```

## Cleaning the Cache (Optional)
If you encounter any issues, clearing the npm cache might help:

```
npm cache clean --force
```

## Technologies Used
* typescript
* React
* Material-UI (MUI)
* Leaflet
* react-leaflet

# AXIS workshop - new gen of Maps

## Providers

- [Open Street Maps](https://www.openstreetmap.org/)
  - Data only
  - Several libraries/tools available for use
  - https://openlayers.org/
  - https://leafletjs.com/
  - https://maplibre.org/
  - https://www.mapbox.com/ -limited usage
  - https://www.arcgis.com/index.html - limited usage
- [Azure Maps](https://azure.microsoft.com/en-us/products/azure-maps)
  - all in one solution
- [TomTom Maps](https://www.tomtom.com/products/maps-sdk/)
  - all in one solution

## Pricing, licensing, etc.

- Attribution, licensing, and costs
- Check if there are any developer accounts or free levels available.

## Data, customization and feature sets

### Layers

- Lands, countries, national parks
- Boundaries (National, Regional, Town, Local)
- Streets and roads
- Oceans, seas, rivers, bays
- Public transport
  - trains, ferries
- Custom layers, such as election boundaries or others defined in a GeoJSON file
- Overlay with icons (images)
- Satellite view (data provider?)

### Customization

- Layer coloring
- Custom layers (e.g., GeoJSON file support)
- Text customization
- Street and area text customization/manipulation
- Globe view?
- Layer visibility based on zoom level and custom settings
- Disable ocean grid

### Features

- WYSIWYG: Ability to export an image (in a predefined format and resolution) that matches exactly what the user sees (including additional layers, customizations, etc.)
  - If not possible, how can this be achieved?
- Multiple overlay layers - both static and movable
- Animation possibilities?
- "Magnetic route planning"
- Static route planning (A to B)
- POI search (geocoding)
- Support for different output formats
- How to create a video from keyframes?
- Show/hide individual layers

### Technical side

- React/TypeScript support
- REST API, SDK, etc., support
- Availability of documentation