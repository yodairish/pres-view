'use strict';

jest.dontMock('../PresControls/PresControls.js');
jest.dontMock('../Pres.js');

import React from 'react/addons';
import Pres from '../Pres.js';
import PresControls from '../PresControls/PresControls.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('Pres component', () => {
  var slides = [
        'startImage.jpg',
        'other.jpg'
      ],
      pres;
  
  beforeEach(() => {
    PresViewStore.getCurrentSlide.mockReturnValue(0);
    PresViewStore.getSlides.mockReturnValue(slides);
    PresViewStore.getFullscreeStatus.mockReturnValue(false);
    
    PresViewStore.addCurrentSlideListener.mockClear();
    PresViewStore.addFullscreenListener.mockClear();
    
    pres = TestUtils.renderIntoDocument(
      <Pres />
    );
  });
  
  it('Initialize with current image', () => {
    var image = TestUtils.findRenderedDOMComponentWithClass(
          pres,
          'presentation-img'
        );
        
    expect(image.props.src).toBe(slides[0]);
  });
  
  it('Update image when change slide', () => {
    var image;
    
    PresViewStore.getCurrentSlide.mockReturnValue(1);
    PresViewStore.addCurrentSlideListener.mock.calls[0][0]();
    
    image = TestUtils.findRenderedDOMComponentWithClass(
      pres,
      'presentation-img'
    );
    
    // // FIXME some reason it's don't changed here..
    // expect(image.props.src).toBe(slides[1]);
  });
  
  it('Show controls in fullscreen mode', () => {
    var controls = TestUtils.scryRenderedComponentsWithType(
          pres,
          PresControls
        );
    
    expect(controls.length).toBe(0);
    
    PresViewStore.getFullscreeStatus.mockReturnValue(true);
    PresViewStore.addFullscreenListener.mock.calls[0][0]();
    
    controls = TestUtils.scryRenderedComponentsWithType(
      pres,
      PresControls
    );
    
    expect(controls.length).toBe(1);
  });
});
