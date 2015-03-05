'use strict';

import React from 'react';
import ProgressBar from './ProgressBar/ProgressBar.js';
import PresControls from './PresControls/PresControls.js';
import PresViewStore from '../../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    var slide = PresViewStore.getCurrentSlide(),
        slides = PresViewStore.getSlides();
    
    return {
      slide: slide,
      img: slides[slide],
      fullscreen: PresViewStore.getFullscreeStatus()
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating slide
   */
  componentDidMount() {
    PresViewStore.addSlideListListener(this.onUpdateSlide);
    PresViewStore.addCurrentSlideListener(this.onUpdateSlide);
    PresViewStore.addFullscreenListener(this.onFullscreen);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating slide
   */
  componentWillUnmount() {
    PresViewStore.removeSlideListListener(this.onUpdateSlide);
    PresViewStore.removeCurrentSlideListener(this.onUpdateSlide);
    PresViewStore.removeFullscreenListener(this.onFullscreen);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var controls = '';
    
    if (this.state.fullscreen) {
      controls = <PresControls />;
    }
    
    return (
      <div className="presentation">
        <ProgressBar />
        {controls}
        <img className="presentation-img"
             src={this.state.img} />
      </div>
    );
  },
  
  /**
   * Updating showing slide
   */
  onUpdateSlide() {
    var slide = PresViewStore.getCurrentSlide(),
        slides = PresViewStore.getSlides();
    
    this.setState({
      slide: slide,
      img: slides[slide],
      fullscreen: this.state.fullscreen
    });
  },
  
  /**
   * Update fullscreen status
   */
  onFullscreen() {
    this.setState({
      slide: this.state.slide,
      img: this.state.img,
      fullscreen: PresViewStore.getFullscreeStatus()
    });
  }
});
