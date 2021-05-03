import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MyMapBox from './components/Custom/MyMapBox';
import AvciAppBar from './components/Custom/AvciAppBar';
import { Grid } from 'gymnast';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ layout: layout });
  }

  render() {
    return (
      <div>
        <AvciAppBar />
        <Grid>
          <Grid size={3} margin={2}>
            <img className='gridItem' src='./radar.jpg' />
          </Grid>
          <Grid size={9}>
            <MyMapBox onLayoutChange={this.onLayoutChange} />
          </Grid>
        </Grid>
        <Grid size={12} margin={1}></Grid>
        <Grid size={3} margin={1}>
          <img className='gridItem' src='./Capture2.jpeg' />
        </Grid>
        <Grid size={12} margin={0}>
          <MyMapBox onLayoutChange={this.onLayoutChange} />
        </Grid>
      </div>
    );
  }
}
const contentDiv = document.getElementById('root');
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(MainPage, gridProps), contentDiv);
