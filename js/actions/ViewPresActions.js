'use strict';

import appDispatcher from '../dispatcher/appDispatcher.js';
import {ACTIONS_PRES_VIEW} from '../constants.js';

export default {
  /**
   * Open new presentation
   * @param {number} id
   */
  open(id) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.OPEN,
      id: id
    });
  },
  
  /**
   * Close presentation
   */
  close() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.CLOSE
    });
  },
  
  /**
   * Create action for getting presentation slides
   * @param {array} slides
   */
  getSlides(slides) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
  },
  
  /**
   * Show picked slide
   * @param {number} slideNumber
   */
  showSlide(slideNumber) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.SHOW_SLIDE,
      slideNumber: slideNumber
    });
  },
  
  /**
   * Open presentation in full screen mode
   */
  fullscreen() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.FULL_SCREEN
    });
  },
  
  /**
   * Toggle favorite status for presentation
   */
  toggleFavoriteStatus() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.TOGGLE_FAVORITE
    });
  }
};
