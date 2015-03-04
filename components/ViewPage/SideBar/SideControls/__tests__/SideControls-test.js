'use strict';

jest.dontMock('../SideControls.js');

import React from 'react/addons';
import SideControls from '../SideControls.js';
import ViewPresActions from '../../../../../js/actions/ViewPresActions.js';
import PresListActions from '../../../../../js/actions/PresListActions.js';
import PresListStore from '../../../../../js/stores/PresListStore.js';
import PresViewStore from '../../../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('SideControls component', () => {
  var id = 123,
      sideControls;
  
  beforeEach(() => {
    ViewPresActions.close.mockClear();
    PresListActions.toggleFavoriteStatus.mockClear();
    ViewPresActions.fullscreen.mockClear();
    PresListStore.addChangeListener.mockClear();
    
    PresListStore.isFavoritePresentation.mockReturnValue(false);
    PresViewStore.getId.mockReturnValue(id);
    
    sideControls = TestUtils.renderIntoDocument(
      <SideControls />
    );
  });
  
  it('Update favorite status on changing item status', () => {
    var favoriteButton = TestUtils.scryRenderedDOMComponentsWithClass(
          sideControls,
          'control-button'
        )[1].getDOMNode(),
        changeCallback = PresListStore.addChangeListener.mock.calls[0][0];

    expect(favoriteButton.className).not.toContain('control--active');
    
    PresListStore.isFavoritePresentation.mockReturnValue(true);
    changeCallback();
    
    expect(favoriteButton.className).toContain('control--active');
  });
  
  it('Close presentation', () => {
    var closeButton = TestUtils.scryRenderedDOMComponentsWithClass(
          sideControls,
          'control-button'
        )[0].getDOMNode();
        
    TestUtils.Simulate.click(closeButton);
        
    expect(ViewPresActions.close.mock.calls.length).toBe(1);
  });
  
  it('Toggle favorite satus', () => {
    var favoriteButton = TestUtils.scryRenderedDOMComponentsWithClass(
          sideControls,
          'control-button'
        )[1].getDOMNode();
        
    TestUtils.Simulate.click(favoriteButton);
        
    expect(PresListActions.toggleFavoriteStatus.mock.calls[0][0]).toBe(id);
  });
  
  it('Active fullscreen mode', () => {
    var fullscreenButton = TestUtils.scryRenderedDOMComponentsWithClass(
          sideControls,
          'control-button'
        )[2].getDOMNode();
        
    TestUtils.Simulate.click(fullscreenButton);
        
    expect(ViewPresActions.fullscreen.mock.calls.length).toBe(1);
  });
});
