'use strict';

jest.dontMock('../../constants.js');
jest.dontMock('../ViewPresActions.js');

import {ACTIONS_PRES_VIEW} from '../../constants.js';
import appDispatcher from '../../dispatcher/appDispatcher.js';
import PresListActions from '../ViewPresActions.js';

describe('Action creator for presentation view', () => {
  beforeEach(() => {
    appDispatcher.dispatch.mockClear();
  });
  
  it('Open new presentation action', () => {
    var id = 5,
        action;
        
    PresListActions.open(id);
    
    action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.OPEN);
    expect(action.id).toBe(id);
  });
  
  it('Close presentation action', () => {
    PresListActions.close();
    
    var action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.CLOSE);
  });
  
  it('Get slides for presentation action', () => {
    var slides = [{}, {}],
        action;
    
    PresListActions.getSlides(slides);
    
    action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.GET_SLIDES);
    expect(action.slides).toEqual(slides);
  });
  
  it('Show slide action', () => {
    var slideNumber = 5,
        action;
    
    PresListActions.showSlide(slideNumber);
    
    action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.SHOW_SLIDE);
    expect(action.slideNumber).toBe(slideNumber);
  });
  
  it('Show in fullscreen mode action', () => {
    PresListActions.fullscreen(true);
    
    var action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.FULL_SCREEN);
    expect(action.status).toBeTruthy();
  });
});
