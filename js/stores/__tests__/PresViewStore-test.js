'use strict';

jest.dontMock('../PresViewStore.js');

import {ACTIONS_PRES_VIEW} from '../../constants.js';

describe('Store for view presentation', () => {
  var appDispatcher,
      PresViewStore,
      callback,
      loader,
      slideListCallback,
      progressCallback,
      currentSlideCallback,
      fullscreenCallback,
      visibilityCallback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresViewStore = require('../PresViewStore.js');
    loader = require('../../utils/loader.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
    
    slideListCallback = jest.genMockFn();
    progressCallback = jest.genMockFn();
    currentSlideCallback = jest.genMockFn();
    fullscreenCallback = jest.genMockFn();
    visibilityCallback = jest.genMockFn();
    
    PresViewStore.addSlideListListener(slideListCallback);
    PresViewStore.addProgressListener(progressCallback);
    PresViewStore.addCurrentSlideListener(currentSlideCallback);
    PresViewStore.addFullscreenListener(fullscreenCallback);
    PresViewStore.addVisibilityListener(visibilityCallback);
  });
  
  afterEach(() => {
    PresViewStore.removeProgressListener(progressCallback);
  });
  
  it('Register a callback with the dispatcher', () => {
    expect(appDispatcher.register.mock.calls.length).toBe(1);
  });
  
  it('Initializes with empty slides', () => {
    var count = PresViewStore.getCount();
    
    expect(count).toBe(0);
  });
  
  it('If trying show incorrect slide, not call progress change', () => {
    callback({
      type: ACTIONS_PRES_VIEW.SHOW_SLIDE,
      slideNumber: -1
    });
    
    expect(slideListCallback.mock.calls.length).toBe(0);
    expect(progressCallback.mock.calls.length).toBe(0);
  });
  
  it('Get new slides', () => {
    var slides = [{}, {}, {}, {}];
    
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
    
    expect(slideListCallback.mock.calls.length).toBe(1);
    expect(PresViewStore.getSlides()).toEqual(slides);
    expect(currentSlideCallback.mock.calls.length).toBe(1);
    expect(PresViewStore.getCurrentSlide()).toBe(0);
    expect(progressCallback.mock.calls[0][0]).toBe(25);
  });
  
  it('Error until getting slides', () => {
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES_ERROR
    });
    
    expect(PresViewStore.getVisibility()).toBeFalsy();
  });
  
  it('Show new slide', () => {
    var slides = [{}, {}, {}, {}];
    
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
    
    callback({
      type: ACTIONS_PRES_VIEW.SHOW_SLIDE,
      slideNumber: 2
    });
    
    expect(currentSlideCallback.mock.calls.length).toBe(2);
    expect(PresViewStore.getCurrentSlide()).toBe(2);
    expect(progressCallback.mock.calls[1][0]).toBe(75);
  });
  
  it('Open new presentation', () => {
    var id = 5;
    
    callback({
      type: ACTIONS_PRES_VIEW.OPEN,
      id: id
    });
    
    expect(PresViewStore.getId()).toBe(id);
    expect(PresViewStore.getVisibility()).toBeTruthy();
    expect(loader.getSlides.mock.calls[0][0]).toBe(id);
  });
  
  it('Close presentation', () => {
    callback({
      type: ACTIONS_PRES_VIEW.CLOSE
    });
    
    expect(PresViewStore.getVisibility()).toBeFalsy();
  });
  
  it('Update fullscreen status', () => {
    callback({
      type: ACTIONS_PRES_VIEW.FULL_SCREEN,
      status: true
    });
    
    expect(PresViewStore.getFullscreeStatus()).toBeTruthy();
  }); 
});
