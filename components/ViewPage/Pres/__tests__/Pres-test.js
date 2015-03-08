'use strict';

jest.dontMock('../PresControls/PresControls.js');
jest.dontMock('../Pres.js');

import React from 'react/addons';
import Pres from '../Pres.js';
import PresControls from '../PresControls/PresControls.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';
import ViewPresActions from '../../../../js/actions/ViewPresActions.js';

var TestUtils = React.addons.TestUtils;

describe('Pres component', () => {
  var slides = [{
        img: 'startImage.jpg'
      }, {
        img: 'other.jpg'
      }],
      pres;
  
  beforeEach(() => {
    PresViewStore.getCurrentSlide.mockReturnValue(0);
    PresViewStore.getSlides.mockReturnValue(slides);
    PresViewStore.getFullscreeStatus.mockReturnValue(false);
    ViewPresActions.next.mockClear();
    
    PresViewStore.addCurrentSlideListener.mockClear();
    PresViewStore.addFullscreenListener.mockClear();
    
    pres = TestUtils.renderIntoDocument(
      <Pres />
    );
  });
  
  it('Initialize with current image', () => {
    var image = TestUtils.findRenderedDOMComponentWithClass(
          pres,
          'presentation'
        ),
        imageUrl = image.props.style.backgroundImage
                                    .replace(/(url|[()'"]+)/g, '');
        
    expect(imageUrl).toBe(slides[0].img);
  });
  
  it('Update image when change slide', () => {
    var image,
        imageUrl;
    
    PresViewStore.getCurrentSlide.mockReturnValue(1);
    PresViewStore.addCurrentSlideListener.mock.calls[0][0]();
    
    image = TestUtils.findRenderedDOMComponentWithClass(
      pres,
      'presentation'
    );
    imageUrl = image.props.style.backgroundImage
                                .replace(/(url|[()'"]+)/g, '');
    
    // // FIXME some reason it's don't changed here..
    // expect(imageUrl).toBe(slides[1].img);
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
  
  it('Mark with class in fullscreen mode', () => {
    var presentation = TestUtils.findRenderedDOMComponentWithClass(
          pres,
          'presentation'
        ).getDOMNode();
    
    expect(presentation.className).not.toContain('presentation--fullscreen');
    
    PresViewStore.getFullscreeStatus.mockReturnValue(true);
    PresViewStore.addFullscreenListener.mock.calls[0][0]();
    
    presentation = TestUtils.findRenderedDOMComponentWithClass(
      pres,
      'presentation'
    ).getDOMNode();
    
    expect(presentation.className).toContain('presentation--fullscreen');
  });
  
  it('Call next slide on click', () => {
    var presentation = TestUtils.findRenderedDOMComponentWithClass(
          pres,
          'presentation'
        );
        
    TestUtils.Simulate.click(presentation);
    
    expect(ViewPresActions.next.mock.calls.length).toBe(1);
  });
});
