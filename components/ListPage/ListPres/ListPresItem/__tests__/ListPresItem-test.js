'use strict';

jest.dontMock('../ListPresItem.js');

import React from 'react/addons';
import ListPresItem from '../ListPresItem.js';
import ViewPresActions from '../../../../../js/actions/ViewPresActions.js';
import PresListActions from '../../../../../js/actions/PresListActions.js';

var TestUtils = React.addons.TestUtils;

describe('ListPresItem component', () => {
  var id = 123,
      listPresItem;
  
  beforeEach(() => {
    listPresItem = TestUtils.renderIntoDocument(
       <ListPresItem id={id} />
     );
  });
  
  it('Open picked presentation', () => {
    var listPresItemElem = listPresItem.getDOMNode();
        
    TestUtils.Simulate.click(listPresItemElem);
    
    expect(ViewPresActions.open.mock.calls[0][0]).toBe(id);
  });
  
  it('Toggle favorite status', () => {
    var toFavorite = TestUtils.findRenderedDOMComponentWithClass(
          listPresItem,
          'listPresItem-favorite'
        ).getDOMNode();
        
    TestUtils.Simulate.click(toFavorite);
        
    expect(PresListActions.toggleFavoriteStatus.mock.calls[0][0]).toBe(id);
  });
});
