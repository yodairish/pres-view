'use strict';

jest.dontMock('../PreviewItem.js');

import React from 'react/addons';
import PreviewItem from '../PreviewItem.js';
import ViewPresActions from '../../../../../../js/actions/ViewPresActions.js';

var TestUtils = React.addons.TestUtils;

describe('PreviewItem component', () => {
  var img = 'some.jpg',
      position = 5,
      previewItem;
      
  beforeEach(() => {
    previewItem = TestUtils.renderIntoDocument(
       <PreviewItem img={img} position={position} />
     ).getDOMNode();
  });
  
  it('Show slide', () => {
    TestUtils.Simulate.click(previewItem);
    
    expect(ViewPresActions.showSlide.mock.calls[0][0]).toBe(position - 1);
  });
  
  it('Displayed slide', () => {
    expect(previewItem.className).not.toContain('preview-item--displayed');
    
    previewItem = TestUtils.renderIntoDocument(
       <PreviewItem img={img} position={position} displayed />
     ).getDOMNode();
    
    expect(previewItem.className).toContain('preview-item--displayed');
  });
});
