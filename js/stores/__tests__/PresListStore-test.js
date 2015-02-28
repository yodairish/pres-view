'use strict';

jest.dontMock('../PresListStore.js');

import {ACTIONS_PRES_LIST} from '../../constants.js';

describe('Store for presentations list', () => {
  var appDispatcher,
      PresListStore,
      loader,
      callback,
      loadingCallback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresListStore = require('../PresListStore.js');
    loader = require('../../utils/loader.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
    
    loadingCallback = jest.genMockFn();
    PresListStore.addLoadingListener(loadingCallback);
  });
  
  afterEach(() => {
    PresListStore.removeLoadingListener(loadingCallback);
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
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
      items: [{}, {}]
    });
    
    var items = PresListStore.getAll();
    
    expect(loadingCallback.mock.calls[0][0]).toBeFalsy();
    expect(items.length).toBe(2);
  });
  
  it('If error until getting new items, update loading status', () => {
    callback({
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS_ERROR
    });
    
    expect(loadingCallback.mock.calls[0][0]).toBeFalsy();
  });
  
  it('Show only favorites', () => {
    callback({
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
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
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
      items: [{}]
    });
    
    callback({
      type: ACTIONS_PRES_LIST.LOAD_MORE
    });

    expect(loadingCallback.mock.calls[1][0]).toBeTruthy();
    expect(loader.getNextItems.mock.calls[0][0]).toBe(1);
  });
  
  it('Toggle favorite status for item', () => {
    var id = 123,
        items;
    
    callback({
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
      items: [{
        id: id
      }]
    });
    
    callback({
      type: ACTIONS_PRES_LIST.TOGGLE_FAVORITE,
      id: id
    });
    
    items = PresListStore.getAll();

    expect(items[0].favorite).toBeTruthy();
  });
});
