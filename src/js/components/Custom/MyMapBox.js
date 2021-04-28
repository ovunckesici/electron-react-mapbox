import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { Grid } from 'gymnast'
import { Card } from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const MyMapBox = () => {
  const classes = useStyles();

  mapboxgl.workerClass = MapboxWorker;
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2JhdGkiLCJhIjoiY2tucndva2ptMmNqZjJ2bnhndXZ0eWJseSJ9.niml4wx3QRr0vYFGjgUEgg';

  //Map Container
  const mapContainer = useRef();
  const [lng, setLng] = useState(32.779074318116955);
  const [lat, setLat] = useState(39.89567174739892);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    return () => map.remove();
  }, []);
  return (
        <Grid>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <Grid size={9} margin="2" className="map-container" ref={mapContainer}/>
        </Grid>
  );
};

export default MyMapBox;
