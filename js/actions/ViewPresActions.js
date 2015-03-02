'use strict';

import appDispatcher from '../dispatcher/appDispatcher.js';
import {ACTIONS_PRES_VIEW} from '../constants.js';

export default {
  /**
   * Open new presentation
   */
  open() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.OPEN
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
  }
};
