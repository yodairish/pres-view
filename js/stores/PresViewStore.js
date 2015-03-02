'use strict';

import {EventEmitter} from 'events';
import {ACTIONS_PRES_VIEW, STORES_PRES_VIEW} from '../constants.js';
import appDispatcher from '../dispatcher/appDispatcher.js';

var slides = [],
    currentSlide = 0;

var PresViewStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * ============ PROGRESS EVENTS ============
   */
  
  /**
   * call all progress changes callbacks
   */
  emitProgress() {
    this.emit(STORES_PRES_VIEW.PROGRESS, calcProgress());
  },

  /**
   * Add new listener for changing progress
   * @param {function} callback
   */
  addProgressListener(callback) {
    this.on(STORES_PRES_VIEW.PROGRESS, callback);
  },
  
  /**
   * Remove listener for changing progress
   * @param {function} callback
   */
  removeProgressListener(callback) {
    this.removeListener(STORES_PRES_VIEW.PROGRESS, callback);
  },
  
  /**
   * Get count of slides
   * @returns {number}
   */
  getCount() {
    return slides.length;
  }
});

PresViewStore.dispatchToken = appDispatcher.register((action) => {
  switch(action.type) {
    case ACTIONS_PRES_VIEW.GET_SLIDES: {
      slides = action.slides;
      break;
    }
    case ACTIONS_PRES_VIEW.SHOW_SLIDE: {
      if (isValidSlide(action.slideNumber)) {
        currentSlide = action.slideNumber;
      
        PresViewStore.emitProgress();
      }
      
      break;
    }
  }
});

/**
 * 
 * @param {number} slideNumber
 * @return {boolean}
 */
function isValidSlide(slideNumber) {
  return (slideNumber >= 0 && slideNumber < PresViewStore.getCount());
}

/**
 * Calc current progress
 * @returns {number}
 */
function calcProgress() {
  var progress = 0,
      count = PresViewStore.getCount();
  
  if (count) {
    progress = parseInt(((currentSlide + 1) / count) * 100, 10);
  }
  
  return progress;
}

export default PresViewStore;
