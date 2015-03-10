'use strict';

jest.dontMock('../PresViewStore.js');

import {ACTIONS_PRES_VIEW} from '../../constants.js';

describe('Store for view presentation', () => {
  var appDispatcher,
      PresViewStore,
      callback,
      loader,
      localStore,
      slideListCallback,
      progressCallback,
      currentSlideCallback,
      fullscreenCallback,
      visibilityCallback,
      loadingCallback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresViewStore = require('../PresViewStore.js');
    loader = require('../../utils/loader.js');
    localStore = require('../../utils/localStore.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
    
    slideListCallback = jest.genMockFn();
    progressCallback = jest.genMockFn();
    currentSlideCallback = jest.genMockFn();
    fullscreenCallback = jest.genMockFn();
    visibilityCallback = jest.genMockFn();
    loadingCallback = jest.genMockFn();
    
    PresViewStore.addSlideListListener(slideListCallback);
    PresViewStore.addProgressListener(progressCallback);
    PresViewStore.addCurrentSlideListener(currentSlideCallback);
    PresViewStore.addFullscreenListener(fullscreenCallback);
    PresViewStore.addVisibilityListener(visibilityCallback);
    PresViewStore.addLoadingListener(loadingCallback);
  });
  
  afterEach(() => {
    PresViewStore.removeSlideListListener(slideListCallback);
    PresViewStore.removeProgressListener(progressCallback);
    PresViewStore.removeCurrentSlideListener(currentSlideCallback);
    PresViewStore.removeFullscreenListener(fullscreenCallback);
    PresViewStore.removeVisibilityListener(visibilityCallback);
    PresViewStore.removeLoadingListener(loadingCallback);
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
    expect(loadingCallback.mock.calls[0][0]).toBeFalsy();
  });
  
  it('Save slides for presentation in localStorage', () => {
    var slides = [{}, {}, {}, {}],
        id = PresViewStore.getId();
    
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
    
    expect(localStore.saveSlides.mock.calls[0][0]).toEqual(id);
    expect(localStore.saveSlides.mock.calls[0][1]).toEqual(slides);
  });
  
  it('Error until getting slides', () => {
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES_ERROR
    });
    
    expect(PresViewStore.getVisibility()).toBeFalsy();
    expect(loadingCallback.mock.calls[0][0]).toBeFalsy();
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
    expect(loadingCallback.mock.calls[0][0]).toBeTruthy();
  });
  
  it('Don\'t get new slides if open presentation with same id', () => {
    var id = 5;
    
    callback({
      type: ACTIONS_PRES_VIEW.OPEN,
      id: id
    });
    
    callback({
      type: ACTIONS_PRES_VIEW.OPEN,
      id: id
    });
    
    expect(loader.getSlides.mock.calls.length).toBe(1);
  });
  
  it('Open presentation with cached slides into localStore', () => {
    var id = 5,
        slides = [{}, {}, {}, {}];
    
    localStore.getSlides.mockReturnValue(slides);
    
    callback({
      type: ACTIONS_PRES_VIEW.OPEN,
      id: id
    });
    
    expect(localStore.getSlides.mock.calls[0][0]).toBe(id);
    expect(slideListCallback.mock.calls.length).toBe(1);
    expect(PresViewStore.getSlides()).toEqual(slides);
    expect(currentSlideCallback.mock.calls.length).toBe(1);
    expect(PresViewStore.getCurrentSlide()).toBe(0);
    expect(progressCallback.mock.calls[0][0]).toBe(25);
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
  
  it('Show next slide', () => {
    var slides = [{}, {}, {}, {}];
    
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
    
    callback({
      type: ACTIONS_PRES_VIEW.NEXT
    });
    
    expect(currentSlideCallback.mock.calls.length).toBe(2);
    expect(PresViewStore.getCurrentSlide()).toBe(1);
    expect(progressCallback.mock.calls[1][0]).toBe(50);
  });
  
  it('Show previous slide', () => {
    var slides = [{}, {}, {}, {}];
    
    callback({
      type: ACTIONS_PRES_VIEW.GET_SLIDES,
      slides: slides
    });
    
    callback({
      type: ACTIONS_PRES_VIEW.SHOW_SLIDE,
      slideNumber: 2
    });
    
    callback({
      type: ACTIONS_PRES_VIEW.PREV
    });
    
    expect(currentSlideCallback.mock.calls.length).toBe(3);
    expect(PresViewStore.getCurrentSlide()).toBe(1);
    expect(progressCallback.mock.calls[2][0]).toBe(50);
  });
});
