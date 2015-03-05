'use strict';

import React from 'react';
import ViewPresActions from '../../../../js/actions/ViewPresActions.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      slide: getSlide(),
      count: PresViewStore.getCount()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating slide
   */
  componentDidMount() {
    PresViewStore.addSlideListListener(this.onUpdateSlide);
    PresViewStore.addCurrentSlideListener(this.onUpdateSlide);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating slide
   */
  componentWillUnmount() {
    PresViewStore.removeSlideListListener(this.onUpdateSlide);
    PresViewStore.removeCurrentSlideListener(this.onUpdateSlide);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    return (
      <div className="presControls">
        <span className="presControls-slides">
          {this.state.slide}/{this.state.count}
        </span>
        <span className="presControls-button"
              onClick={this.onCloseFullscreen}>
        </span>
      </div>
    );
  },
  
  /**
   * Quit from full screen mode
   */
  onCloseFullscreen() {
    ViewPresActions.fullscreen(false);
  },
  
  onUpdateSlide() {
    this.setState({
      slide: getSlide(),
      count: PresViewStore.getCount()
    });
  }
});

/**
 * Getting current slide
 * @returns {number}
 */
function getSlide() {
  return PresViewStore.getCurrentSlide() + 1;
}