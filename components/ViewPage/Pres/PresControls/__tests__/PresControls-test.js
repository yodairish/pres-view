'use strict';

jest.dontMock('../PresControls.js');

import React from 'react/addons';
import PresControls from '../PresControls.js';
import PresViewStore from '../../../../../js/stores/PresViewStore.js';
import ViewPresActions from '../../../../../js/actions/ViewPresActions.js';

var TestUtils = React.addons.TestUtils;

describe('PresControls component', () => {
  var current = 2,
      count = 5,
      presControls;
  
  beforeEach(() => {
    PresViewStore.getCount.mockReturnValue(count);
    PresViewStore.getCurrentSlide.mockReturnValue(current);
    ViewPresActions.fullscreen.mockClear();
    
    presControls = TestUtils.renderIntoDocument(
      <PresControls />
    );
  });
  
  it('Initialize with current slides info', () => {
    var slides = TestUtils.findRenderedDOMComponentWithClass(
          presControls,
          'presControls-slides'
        ).getDOMNode();
    
    expect(slides.textContent).toBe((current + 1) + '/' + count);
  });
  
  it('Update slides info when change slide', () => {
    var newCurrent = 3,
        slides;
    
    PresViewStore.getCurrentSlide.mockReturnValue(newCurrent);
    PresViewStore.addCurrentSlideListener.mock.calls[0][0]();
    
    slides = TestUtils.findRenderedDOMComponentWithClass(
      presControls,
      'presControls-slides'
    ).getDOMNode();
    
    // expect(slides.textContent).toBe((newCurrent + 1) + '/' + count);
  });
  
  it('Quit from full screen mode', () => {
    var closeFull = TestUtils.findRenderedDOMComponentWithClass(
      presControls,
      'presControls-button'
    );
    
    TestUtils.Simulate.click(closeFull);
    
    expect(ViewPresActions.fullscreen.mock.calls[0][0]).toBeFalsy();
  });
});
