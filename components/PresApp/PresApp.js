'use strict';

import React from 'react';
import ListPage from '../ListPage/ListPage.js';
import ViewPage from '../ViewPage/ViewPage.js';
import PresViewStore from '../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      viewMode: PresViewStore.getVisibility()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating view mode
   */
  componentDidMount() {
    PresViewStore.addVisibilityListener(this.onViewMode);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating view mode
   */
  componentWillUnmount() {
    PresViewStore.removeVisibilityListener(this.onViewMode);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var content;
    
    if (this.state.viewMode) {
      content = <ViewPage />;
      
    } else {
      content = <ListPage />;
    }
    
    return (
      <div className="presApp">
        {content}
      </div>
    );
  },
  
  /**
   * Update status of view mode
   */
  onViewMode() {
    this.setState({
      viewMode: PresViewStore.getVisibility()
    });
  }
});
