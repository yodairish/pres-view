'use strict';

jest.dontMock('../PresListStore.js');

import {ACTIONS_PRES_LIST} from '../../constants.js';

describe('Store for presentations list', () => {
  var appDispatcher,
      PresListStore,
      loader,
      localStore,
      callback,
      changeCallback,
      loadingCallback;
  
  beforeEach(() => {
    appDispatcher = require('../../dispatcher/appDispatcher.js');
    PresListStore = require('../PresListStore.js');
    loader = require('../../utils/loader.js');
    localStore = require('../../utils/localStore.js');
    
    callback = appDispatcher.register.mock.calls[0][0];
    
    changeCallback = jest.genMockFn();
    loadingCallback = jest.genMockFn();
    PresListStore.addChangeListener(changeCallback);
    PresListStore.addLoadingListener(loadingCallback);
  });
  
  afterEach(() => {
    PresListStore.addChangeListener(changeCallback);
    PresListStore.removeLoadingListener(loadingCallback);
  });
  
  it('Register a callback with the dispatcher', () => {
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
    
    expect(changeCallback.mock.calls.length).toBe(1);
    expect(loadingCallback.mock.calls[0][0]).toBeFalsy();
    expect(items.length).toBe(2);
  });
  
  it('Save presentations in localStorage', () => {
    var items = [{}, {}];
    
    callback({
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
      items: items
    });
    
    expect(localStore.savePresentations.mock.calls[0][0]).toEqual(items);
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
    
    expect(changeCallback.mock.calls.length).toBe(2);
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
  
  it('Load next 6 items from localStorage', () => {
    var items = [{}, {}, {}, {}, {}, {},
                 {}, {}, {}, {}];
                 
    localStore.getPresentations.mockReturnValue(items);
    
    callback({
      type: ACTIONS_PRES_LIST.LOAD_MORE
    });
    
    expect(PresListStore.getAll()).toEqual(items.slice(0, 6));
    
    callback({
      type: ACTIONS_PRES_LIST.LOAD_MORE
    });
    
    expect(PresListStore.getAll()).toEqual(items);
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

    expect(changeCallback.mock.calls.length).toBe(2);
    expect(items[0].favorite).toBeTruthy();
  });
  
  it('Check favorite status for item', () => {
    var id1 = 123,
        id2 = 321;
    
    callback({
      type: ACTIONS_PRES_LIST.GET_NEW_ITEMS,
      items: [{
        id: id1,
        favorite: true
      }, {
        id: id2
      }]
    });
    
    expect(PresListStore.isFavoritePresentation(id1)).toBeTruthy();
    expect(PresListStore.isFavoritePresentation(id2)).toBeFalsy();
    expect(PresListStore.isFavoritePresentation(-1)).toBeFalsy();
  });
});
