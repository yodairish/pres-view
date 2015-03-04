'use strict';

import React from 'react';
import ProgressBar from './ProgressBar/ProgressBar.js';
import PresViewStore from '../../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      img: PresViewStore.getCurrentSlideImg()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating slide
   */
  componentDidMount() {
    PresViewStore.addCurrentSlideListener(this.onNewSlide);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating slide
   */
  componentWillUnmount() {
    PresViewStore.removeCurrentSlideListener(this.onNewSlide);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    return (
      <div className="presentation">
        <ProgressBar />
        <img className="presentation-img"
             src={this.state.img} />
      </div>
    );
  },
  
  /**
   * Updating showing slide
   */
  onNewSlide() {
    this.setState({
      img: PresViewStore.getCurrentSlideImg()
    });
  }
});
