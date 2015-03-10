'use strict';

import {EventEmitter} from 'events';
import {ACTIONS_PRES_VIEW, STORES_PRES_VIEW} from '../constants.js';
import appDispatcher from '../dispatcher/appDispatcher.js';
import loader from '../utils/loader.js';
import keyController from '../utils/keyController.js';
import localStore from '../utils/localStore.js';

var slides = [],
    presentationId = -1,
    currentSlide = 0,
    fullscreen = false,
    visibility = false,
    loading = false,
    PresViewStore;

PresViewStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * ============ VISIBILITY EVENTS ============
   */
   
  /**
   * Call all visibility changes callbacks
   */
  emitVisibility() {
    this.emit(STORES_PRES_VIEW.VISIBILITY);
  },

  /**
   * Add new listener for changing visibility
   * @param {function} callback
   */
  addVisibilityListener(callback) {
    this.on(STORES_PRES_VIEW.VISIBILITY, callback);
  },
  
  /**
   * Remove listener for changing visibility
   * @param {function} callback
   */
  removeVisibilityListener(callback) {
    this.removeListener(STORES_PRES_VIEW.VISIBILITY, callback);
  },
  
  // ========================================
  
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
    this.emit(STORES_PRES_VIEW.CURRENT_SLIDE);
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
   * ============ FULL SCREEN STATUS EVENTS ============
   */
  
  /**
   * call all changing fullscreen callbacks
   */
  emitFullscreen() {
    this.emit(STORES_PRES_VIEW.FULL_SCREEN);
  },

  /**
   * Add new listener for changing fullscreen
   * @param {function} callback
   */
  addFullscreenListener(callback) {
    this.on(STORES_PRES_VIEW.FULL_SCREEN, callback);
  },
  
  /**
   * Remove listener for changing fullscreen
   * @param {function} callback
   */
  removeFullscreenListener(callback) {
    this.removeListener(STORES_PRES_VIEW.FULL_SCREEN, callback);
  },
  
  // ========================================
  
  /**
   * ============ LOADING EVENTS ============
   */
  
  /**
   * Call all loading callbacks
   */
  emitLoading() {
    this.emit(STORES_PRES_VIEW.LOADING, loading);
  },
  
  /**
   * Add new listener for change loading status
   * @param {function} callback
   */
  addLoadingListener(callback) {
    this.on(STORES_PRES_VIEW.LOADING, callback);
  },
  
  /**
   * Remove listener from change loading status
   * @param {function} callback
   */
  removeLoadingListener(callback) {
    this.removeListener(STORES_PRES_VIEW.LOADING, callback);
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
   * @return {number}
   */
  getCurrentSlide() {
    return currentSlide;
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
  },
  
  /**
   * Get current fullscreen status
   * @returns {boolean}
   */
  getFullscreeStatus() {
    return fullscreen;
  },
  
  /**
   * Get current visibility
   * @returns {boolean}
   */
  getVisibility() {
    return visibility;
  },
  
  /**
   * Get current loading new slides status
   * @returns {boolean}
   */
  getLoadingStatus() {
    return loading;
  }
});

PresViewStore.dispatchToken = appDispatcher.register((action) => {
  switch (action.type) {
    case ACTIONS_PRES_VIEW.OPEN: {
      var needLoad = (presentationId !== action.id),
          savedSlides;
      
      presentationId = action.id;
      
      if (needLoad) {
        savedSlides = localStore.getSlides(action.id);
        
        if (savedSlides) {
          onGetSlides(savedSlides);
          
        } else {
          loading = true;
          PresViewStore.emitLoading();
          loader.getSlides(presentationId);
        }
      }
      
      visibility = true;
      PresViewStore.emitVisibility();
      keyController.startListen();
      
      break;
    }
    case ACTIONS_PRES_VIEW.CLOSE: {
      visibility = false;
      PresViewStore.emitVisibility();
      keyController.stopListen();
      break;
    }
    case ACTIONS_PRES_VIEW.GET_SLIDES: {
      onGetSlides(action.slides);
      localStore.saveSlides(presentationId, action.slides);
      
      loading = false;
      PresViewStore.emitLoading();
      break;
    }
    case ACTIONS_PRES_VIEW.GET_SLIDES_ERROR: {
      loading = false;
      visibility = false;
      
      PresViewStore.emitLoading();
      PresViewStore.emitVisibility();
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
    case ACTIONS_PRES_VIEW.FULL_SCREEN: {
      fullscreen = !!action.status;
      
      PresViewStore.emitFullscreen();
      break;
    }
    case ACTIONS_PRES_VIEW.NEXT: {
      if (currentSlide < (PresViewStore.getCount() - 1)) {
        currentSlide++;
        
        PresViewStore.emitCurrentSlide();
        PresViewStore.emitProgress();
      }
      
      break;
    }
    case ACTIONS_PRES_VIEW.PREV: {
      if (currentSlide > 0) {
        currentSlide--;
        
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

/**
 * Processing getting new slides
 * @param {array} newSlides
 */
function onGetSlides(newSlides) {
  slides = newSlides;
  currentSlide = 0;
  
  PresViewStore.emitSlideList();
  PresViewStore.emitCurrentSlide();
  PresViewStore.emitProgress();
}

export default PresViewStore;
