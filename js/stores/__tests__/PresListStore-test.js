'use strict';

jest.dontMock('../PresListStore.js');

import {ACTIONS_PRES_LIST} from '../../constants.js';

describe('Store for presentations list', () => {
  var appDispatcher,
      PresListStore,
      loader,
      callback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresListStore = require('../PresListStore.js');
    loader = require('../../utils/loader.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
  });
  
  it('register a callback with the dispatcher', () => {
    expect(appDispatcher.register.mock.calls.length).toBe(1);
  });
  
  it('Initializes with empty items list', () => {
    var items = PresListStore.getAll();
    
    expect(items.length).toBe(0);
  });
  
  it('Add new items to the list', () => {
    callback({
      type: ACTIONS_PRES_LIST.GET_MEW_ITEMS,
      items: [{}, {}]
    });
    
    var items = PresListStore.getAll();
    
    expect(items.length).toBe(2);
  });
  
  it('Show only favorites', () => {
    callback({
      type: ACTIONS_PRES_LIST.GET_MEW_ITEMS,
      items: [{}, {
        favorite: true
      }]
    });
    
    callback({
      type: ACTIONS_PRES_LIST.FAVORITES,
      active: true
    });
    
    var items = PresListStore.getAll();
    
    expect(items.length).toBe(1);
  });
  
  it('Load more items', () => {
    callback({
      type: ACTIONS_PRES_LIST.GET_MEW_ITEMS,
      items: [{}]
    });
    
    callback({
      type: ACTIONS_PRES_LIST.LOAD_MORE
    });

    expect(loader.getNextItems.mock.calls[0][0]).toBe(1);
  });
});
