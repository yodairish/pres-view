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
      fullscreen: PresViewStore.getFullscreeStatus(),
      loading: PresViewStore.getLoadingStatus()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating fullscreen mode
   */
  componentDidMount() {
    PresViewStore.addFullscreenListener(this.onUpdate);
    PresViewStore.addLoadingListener(this.onUpdate);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating fullscreen mode
   */
  componentWillUnmount() {
    PresViewStore.removeFullscreenListener(this.onUpdate);
    PresViewStore.removeLoadingListener(this.onUpdate);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var presentation,
        sideBar;
    
    if (this.state.loading) {
      presentation = (
        <div className="spinner"></div>
      );
      
    } else {
      if (!this.state.fullscreen) {
        sideBar = <SideBar />;
      }
      
      presentation = <Pres />;
    }
    
    return (
      <div className="viewPres">
        {presentation}
        {sideBar}
      </div>
    );
  },
  
  /**
   * Update fullscreen status
   */
  onUpdate() {
    this.setState({
      fullscreen: PresViewStore.getFullscreeStatus(),
      loading: PresViewStore.getLoadingStatus()
    });
  }
});
