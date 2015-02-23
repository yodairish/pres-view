'use strict';

jest.dontMock('../ListPresItem/ListPresItem.js');
jest.dontMock('../ListPres.js');

import React from 'react/addons';
import PresListStore from '../../../../js/stores/PresListStore.js';
import ListPresItem from '../ListPresItem/ListPresItem.js';
import ListPres from '../ListPres.js';

var TestUtils = React.addons.TestUtils;

describe('List Pres component', () => {
  var list,
      listPres;
  
  beforeEach(() => {
    list = [{
      id: 11
    }, {
      id: 22
    }];
    
    PresListStore.getAll.mockReturnValue(list);
    PresListStore.addNextPartListener.mockClear();
    
    listPres = TestUtils.renderIntoDocument(<ListPres />);
  });
  
  it('Initialize with all available items', () => {
    var items = TestUtils.scryRenderedComponentsWithType(
          listPres,
          ListPresItem
        );
    
    expect(items.length).toBe(2);
    expect(items[0].props.id).toBe(11);
  });
  
  it('Update list after getting a new part', () => {
    var items;
    
    list.push({
      id: 33
    });
    
    PresListStore.addNextPartListener.mock.calls[0][0]();
    
    items = TestUtils.scryRenderedComponentsWithType(
      listPres,
      ListPresItem
    );
    
    expect(items.length).toBe(3);
  });
  
  it('If no items then show empty message', () => {
    var message = TestUtils.scryRenderedDOMComponentsWithClass(
      listPres,
      'listPres-empty'
    );
    
    expect(message.length).toBe(0);
    
    PresListStore.getAll.mockReturnValue([]);
    PresListStore.addNextPartListener.mock.calls[0][0]();
    
    var message = TestUtils.scryRenderedDOMComponentsWithClass(
      listPres,
      'listPres-empty'
    );
    
    expect(message.length).toBe(1);
  });
});
