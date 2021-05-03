import React from 'react';
import DeckGL from '@deck.gl/react';
import { MapView, FirstPersonView } from '@deck.gl/core';
import { StaticMap } from 'react-map-gl';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { IconLayer, ScatterplotLayer } from '@deck.gl/layers';

const MyMapBox = () => {
  // Set your mapbox access token here
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoiZ2JhdGkiLCJhIjoiY2tucndva2ptMmNqZjJ2bnhndXZ0eWJseSJ9.niml4wx3QRr0vYFGjgUEgg';

  //Map Container
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 32.779074318116955,
    latitude: 39.89567174739892,
    zoom: 15,
    pitch: 0,
    bearing: 0,
  };

  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 500, height: 500, mask: false },
  };

  // Data to be used by the LineLayer
  const data = [
    {
      name: 'SDT A.Ş',
      coordinates: [32.779074318116955, 39.89567174739892],
    },
  ];

  const iconLayer = new IconLayer({
    id: 'icon-layer',
    data,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas: 'src/tower.png',
    iconMapping: ICON_MAPPING,
    getIcon: (d) => 'marker',

    sizeScale: 15,
    getPosition: (d) => d.coordinates,
    getSize: (d) => 5,
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
  });

  const circleLayer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data,
    pickable: true,
    opacity: 0.1,
    stroked: true,
    filled: true,
    radiusScale: 7,
    radiusMinPixels: 1,
    radiusMaxPixels: 500000,
    lineWidthMinPixels: 1,
    getPosition: (d) => d.coordinates,
    getRadius: (d) => Math.sqrt(8000),
    getFillColor: (d) => [255, 140, 0],
    getLineColor: (d) => [0, 0, 0],
  });

  const layers = [iconLayer, circleLayer];

  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/satellite-v9',
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  //   map.on('move', () => {
  //     setLng(map.getCenter().lng.toFixed(4));
  //     setLat(map.getCenter().lat.toFixed(4));
  //     setZoom(map.getZoom().toFixed(2));
  //   });
  //   return () => map.remove();
  // }, []);
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <MapView id='map' controller={true}>
        <StaticMap
          className='map-container'
          mapStyle='mapbox://styles/mapbox/satellite-v9'
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      </MapView>
    </DeckGL>
  );
};

export default MyMapBox;
