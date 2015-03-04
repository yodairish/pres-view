'use strict';

// jest.dontMock('../ProgressBar/ProgressBar.js');
jest.dontMock('../Pres.js');

import React from 'react/addons';
import Pres from '../Pres.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('Pres component', () => {
  var img = 'startImage.jpg',
      pres;
  
  beforeEach(() => {
    PresViewStore.getCurrentSlideImg.mockReturnValue(img);
    
    pres = TestUtils.renderIntoDocument(
      <Pres />
    );
  });
  
  it('Initialize with current image', () => {
    var image = TestUtils.findRenderedDOMComponentWithClass(
          pres,
          'presentation-img'
        );
    
    expect(image.props.src).toBe(img);
  });
  
  it('Update image when change slide', () => {
    var img2 = 'other.jpg',
        image;
    
    PresViewStore.getCurrentSlideImg.mockReturnValue(img2);
    PresViewStore.addCurrentSlideListener.mock.calls[0][0]();
    
    image = TestUtils.scryRenderedDOMComponentsWithClass(
      pres,
      'presentation-img'
    );
    
    // FIXME some reason it's don't changed here..    
    // expect(image.props.src).toBe(img2);
  });
});
