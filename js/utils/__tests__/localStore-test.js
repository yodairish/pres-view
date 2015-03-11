'use strict';

jest.dontMock('../localStore.js');

var ls = {
  getItem: jest.genMockFn(),
  setItem: jest.genMockFn()
};

Object.defineProperty(window, 'localStorage', { value: ls });

describe('localStore util', () => {
  var localStore;
  
  beforeEach(() => {
    localStorage.getItem.mockClear();
    localStorage.setItem.mockClear();
    
    localStore = require('../../utils/localStore.js');
  });
  
  it('Get slides from local storage', () => {
    var items = [{}, {}, {}],
        id = 5;
    
    localStorage.getItem.mockReturnValue(
      JSON.stringify(items)
    );
    
    expect(localStore.getSlides(id)).toEqual(items);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('slides' + id);
  });
  
  it('Save slides into local storage', () => {
    var items = [{}, {}, {}],
        id = 5;
        
    localStore.saveSlides(id, items);
    
    expect(localStorage.setItem.mock.calls[0][0]).toBe('slides' + id);
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(items));
  });
  
  it('Get presentations from local storage', () => {
    var items = [{}, {}, {}];
    
    localStorage.getItem.mockReturnValue(
      JSON.stringify(items)
    );
    
    expect(localStore.getPresentations()).toEqual(items);
    expect(localStorage.getItem.mock.calls[0][0]).toBe('presentations');
  });
  
  it('Save presentations into local storage', () => {
    var items = [{}, {}, {}];
        
    localStore.savePresentations(items);
    
    expect(localStorage.setItem.mock.calls[0][0]).toBe('presentations');
    expect(localStorage.setItem.mock.calls[0][1]).toBe(JSON.stringify(items));
  });
});
