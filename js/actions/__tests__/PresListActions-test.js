'use strict';

jest.dontMock('../../constants.js');
jest.dontMock('../PresListActions.js');

import {ACTIONS_PRES_LIST} from '../../constants.js';
import appDispatcher from '../../dispatcher/appDispatcher.js';
import PresListActions from '../PresListActions.js';

describe('Action creator for presentations list', () => {
  beforeEach(() => {
    appDispatcher.dispatch.mockClear();
  });
  
  it('Load more action', () => {
    PresListActions.loadMore();
    
    var action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_LIST.LOAD_MORE);
  });
  
  it('Show favorites action', () => {
    var action;
    
    PresListActions.showFavorites(true);
    
    action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_LIST.FAVORITES);
    expect(action.active).toBeTruthy();
    
    PresListActions.showFavorites(false);
    
    action = appDispatcher.dispatch.mock.calls[1][0];
    
    expect(action.type).toBe(ACTIONS_PRES_LIST.FAVORITES);
    expect(action.active).toBeFalsy();
  });
  
  it('Toggle favorite status for item', () => {
    var id = 123,
        action;
    
    PresListActions.toggleFavoriteStatus(id);
    
    action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_LIST.TOGGLE_FAVORITE);
    expect(action.id).toBe(id);
  });
});
