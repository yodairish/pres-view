'use strict';

jest.dontMock('../ListPresItem.js');

import React from 'react/addons';
import ListPresItem from '../ListPresItem.js';
import ViewPresActions from '../../../../../js/actions/ViewPresActions.js';

var TestUtils = React.addons.TestUtils;

describe('ListPresItem component', () => {
  it('Open picked presentation', () => {
    var id = 123,
        listPresItem = TestUtils.renderIntoDocument(
          <ListPresItem id={id} />
        ).getDOMNode();
        
    TestUtils.Simulate.click(listPresItem);
    
    expect(ViewPresActions.open.mock.calls[0][0]).toBe(id);
  });
});
