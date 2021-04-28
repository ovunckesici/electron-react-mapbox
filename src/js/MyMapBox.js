import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box
            className='leftPane'
            borderRadius={16}
            borderColor='"primary.main"'
          >
            <img src='./download (1).png' />
          </Box>
        </Grid>
        <br />
        <Box item xs={9} borderRadius={16} borderColor='"primary.main"'>
          <div xs={9} className='map-container' ref={mapContainer} />
        </Box>
      </Grid>
    </div>
  );
};

export default MyMapBox;
