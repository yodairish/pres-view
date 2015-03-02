'use strict';

jest.dontMock('../PresViewStore.js');

import {ACTIONS_PRES_VIEW} from '../../constants.js';

describe('Store for view presentation', () => {
  var appDispatcher,
      PresViewStore,
      callback,
      progressCallback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresViewStore = require('../PresViewStore.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
    
    progressCallback = jest.genMockFn();
    PresViewStore.addProgressListener(progressCallback);
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
    
    expect(progressCallback.mock.calls.length).toBe(0);
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
    
    expect(progressCallback.mock.calls[0][0]).toBe(75);
  });
});
