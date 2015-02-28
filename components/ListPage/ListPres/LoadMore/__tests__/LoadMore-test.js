'use strict';

jest.dontMock('../LoadMore.js');

import React from 'react/addons';
import LoadMore from '../LoadMore.js';
import PresListStore from '../../../../../js/stores/PresListStore.js';
import PresListActions from '../../../../../js/actions/PresListActions.js';

var TestUtils = React.addons.TestUtils;

describe('LoadMore Component', () => {
  var loadMore,
      button,
      spinner,
      loadingCallback;
      
  beforeEach(() => {
    PresListStore.addLoadingListener.mockClear();
    PresListActions.loadMore.mockClear();
    
    loadMore = TestUtils.renderIntoDocument(
                 <LoadMore />
               );

    button = TestUtils.findRenderedDOMComponentWithClass(
               loadMore,
               'loadMore-button'
             ).getDOMNode();

    spinner = TestUtils.findRenderedDOMComponentWithClass(
                loadMore,
                'spinner'
              ).getDOMNode();
              
    loadingCallback = PresListStore.addLoadingListener.mock.calls[0][0];
  });
  
  it('Show spinner on click and call load more action', () => {
    expect(button.className).not.toContain('hidden');
    expect(spinner.className).toContain('hidden');
    expect(PresListActions.loadMore.mock.calls.length).toBe(0);
    
    TestUtils.Simulate.click(button);
    loadingCallback(true);
    
    expect(button.className).toContain('hidden');
    expect(spinner.className).not.toContain('hidden');
    expect(PresListActions.loadMore.mock.calls.length).toBe(1);
  });
  
  it('When store get new part return to default state', function() {
    loadingCallback(true);
    expect(loadMore.state.loading).toBeTruthy();
    
    loadingCallback(false);
    expect(loadMore.state.loading).toBeFalsy();
  });
});
