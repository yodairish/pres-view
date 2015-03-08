'use strict';

import React from 'react/addons';
import ProgressBar from './ProgressBar/ProgressBar.js';
import PresControls from './PresControls/PresControls.js';
import PresViewStore from '../../../js/stores/PresViewStore.js';
import ViewPresActions from '../../../js/actions/ViewPresActions.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    var slide = PresViewStore.getCurrentSlide();
    
    return {
      slide: slide,
      img: getImage(slide),
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
    var cx = React.addons.classSet,
        presentationClasses = cx({
          presentation: true,
          'presentation--fullscreen': this.state.fullscreen
        }),
        inlineImg = {
          backgroundImage: 'url(' + this.state.img + ')'
        },
        controls = '';
        
    if (this.state.fullscreen) {
      controls = <PresControls />;
    }
    
    return (
      <div className={presentationClasses}
           ref="presentation"
           style={inlineImg}
           onClick={this.onNext}>
        <ProgressBar />
        {controls}
      </div>
    );
  },
  
  /**
   * Updating showing slide
   */
  onUpdateSlide() {
    var slide = PresViewStore.getCurrentSlide();
    
    this.setState({
      slide: slide,
      img: getImage(slide),
      fullscreen: PresViewStore.getFullscreeStatus()
    });
  },
  
  /**
   * Update fullscreen status
   */
  onFullscreen() {
    var status = PresViewStore.getFullscreeStatus();
    
    this.setState({
      slide: this.state.slide,
      img: this.state.img,
      fullscreen: status
    });
    
    if (status) {
      this.requestFullscreen();
      
    } else {
      this.exitFullscreen();
    }
  },
  
  /**
   * Call for next slide
   */
   onNext() {
     ViewPresActions.next();
   },
   
   /**
    * Request fullscreen mode
    */
    requestFullscreen() {
      var elem = this.refs.presentation.getDOMNode();
      
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    },
    
    /**
     * Exit from fullscreen mode
     */
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
});

/**
 * Get image for slide
 */
function getImage(slide) {
  var slides = PresViewStore.getSlides(),
      slideObj = slides[slide];
  
  return (slideObj && slideObj.img ?
          slideObj.img :
          '');
}
