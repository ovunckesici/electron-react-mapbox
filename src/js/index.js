import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MyMapBox from './MyMapBox';
import CustomAppBar from './CustomAppBar';
import SimpleBottomNavigation from './SimpleBottomNavigation';

const Footer = () => (
  <footer>
    <p>Some footer nonsense!</p>
  </footer>
);

ReactDOM.render(<CustomAppBar />, document.getElementById('headerPane'));
ReactDOM.render(<MyMapBox />, document.getElementById('mapPane'));
ReactDOM.render(
  <Footer class='bottomPane' />,
  document.getElementById('bottomPane')
);
