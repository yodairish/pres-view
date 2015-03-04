'use strict';

import React from 'react';
import PresViewStore from '../../../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      progress: 0
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating progress
   */
  componentDidMount() {
    PresViewStore.addProgressListener(this.setProgress);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating progress
   */
  componentWillUnmount() {
    PresViewStore.removeProgressListener(this.setProgress);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var style = {
      width: this.state.progress + '%'
    };
    
    return (
      <div className="progressBar">
        <div className="progressBar-fill"
             style={style}>
         </div>
      </div>
    );
  },
  
  /**
   * Set new progress
   * @param {number} progress
   */
  setProgress(progress) {
    this.setState({
      progress: progress
    });
  }
});
