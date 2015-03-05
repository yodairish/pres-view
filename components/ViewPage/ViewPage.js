'use strict';

import React from 'react';
import Pres from './Pres/Pres.js';
import SideBar from './SideBar/SideBar.js';
import PresViewStore from '../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      fullscreen: PresViewStore.getFullscreeStatus()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating fullscreen mode
   */
  componentDidMount() {
    PresViewStore.addFullscreenListener(this.onFullscreen);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating fullscreen mode
   */
  componentWillUnmount() {
    PresViewStore.removeFullscreenListener(this.onFullscreen);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var sideBar = <SideBar />;
    
    if (this.state.fullscreen) {
      sideBar = '';
    }
    
    return (
      <div className="viewPres">
        <Pres />
        {sideBar}
      </div>
    );
  },
  
  /**
   * Update fullscreen status
   */
  onFullscreen() {
    this.setState({
      fullscreen: PresViewStore.getFullscreeStatus()
    });
  }
});
