'use strict';

import {EventEmitter} from 'events';
import {ACTIONS_PRES_VIEW, STORES_PRES_VIEW} from '../constants.js';
import appDispatcher from '../dispatcher/appDispatcher.js';

var slides = [],
    presentationId = -1,
    currentSlide = 0,
    PresViewStore;

PresViewStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * ============ SLIDES LIST EVENTS ============
   */
   
  /**
   * Call all slide list changes callbacks
   */
  emitSlideList() {
    this.emit(STORES_PRES_VIEW.SLIDE_LIST);
  },

  /**
   * Add new listener for changing slide list
   * @param {function} callback
   */
  addSlideListListener(callback) {
    this.on(STORES_PRES_VIEW.SLIDE_LIST, callback);
  },
  
  /**
   * Remove listener for changing slide list
   * @param {function} callback
   */
  removeSlideListListener(callback) {
    this.removeListener(STORES_PRES_VIEW.SLIDE_LIST, callback);
  },
  
  // ========================================
  
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
  
  // ========================================
  
  /**
   * ============ CURRENT SLIDE EVENTS ============
   */
  
  /**
   * call all changing current slide callbacks
   */
  emitCurrentSlide() {
    this.emit(STORES_PRES_VIEW.CURRENT_SLIDE, currentSlide);
  },

  /**
   * Add new listener for changing current slide
   * @param {function} callback
   */
  addCurrentSlideListener(callback) {
    this.on(STORES_PRES_VIEW.CURRENT_SLIDE, callback);
  },
  
  /**
   * Remove listener for changing current slide
   * @param {function} callback
   */
  removeCurrentSlideListener(callback) {
    this.removeListener(STORES_PRES_VIEW.CURRENT_SLIDE, callback);
  },
  
  // ========================================
  
  /**
   * Get all slides
   * @return {array}
   */
  getSlides() {
    return slides;
  },
  
  /**
   * Get image for current slide
   * @return {string}
   */
  getCurrentSlideImg() {
    return slides[currentSlide] || '';
  },
  
  /**
   * Get count of slides
   * @returns {number}
   */
  getCount() {
    return slides.length;
  },
  
  /**
   * Get ID for current presentation
   * @returns {number}
   */
  getId() {
    return presentationId;
  }
});

PresViewStore.dispatchToken = appDispatcher.register((action) => {
  switch (action.type) {
    case ACTIONS_PRES_VIEW.OPEN: {
      presentationId = action.id;
      break;
      // load slides
    }
    case ACTIONS_PRES_VIEW.GET_SLIDES: {
      slides = action.slides;
      currentSlide = 0;
      
      PresViewStore.emitSlideList();
      PresViewStore.emitCurrentSlide();
      PresViewStore.emitProgress();
      break;
    }
    case ACTIONS_PRES_VIEW.SHOW_SLIDE: {
      if (isValidSlide(action.slideNumber)) {
        currentSlide = action.slideNumber;
      
        PresViewStore.emitCurrentSlide();
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
