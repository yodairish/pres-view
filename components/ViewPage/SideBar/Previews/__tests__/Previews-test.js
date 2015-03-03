'use strict';

jest.dontMock('../PreviewItem/PreviewItem.js');
jest.dontMock('../Previews.js');

import React from 'react/addons';
import Previews from '../Previews.js';
import PreviewsItem from '../PreviewItem/PreviewItem.js';
import PresViewStore from '../../../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('Previews component', () => {
  var list,
      previews;
  
  beforeEach(() => {
    list = [{
      img: 'one.jpg',
      position: 1
    }, {
      img: 'two.jpg',
      position: 2
    }];
    
    PresViewStore.getSlides.mockReturnValue(list);
    PresViewStore.addSlideListListener.mockClear();
    PresViewStore.addCurrentSlideListener.mockClear();
    
    previews = TestUtils.renderIntoDocument(
      <Previews />
    );
  });
  
  it('Initialize with all available items', () => {
    var items = TestUtils.scryRenderedComponentsWithType(
          previews,
          PreviewsItem
        );
    
    expect(items.length).toBe(2);
    expect(items[0].props.img).toBe('one.jpg');
  });
  
  it('Update list after getting new slides', () => {
    var items;
    
    list.push({
      img: 'three.jpg',
      position: 3
    });
    
    PresViewStore.addSlideListListener.mock.calls[0][0]();
    
    items = TestUtils.scryRenderedComponentsWithType(
      previews,
      PreviewsItem
    );
    
    expect(items.length).toBe(3);
  });
  
  it('Set new displayed item', () => {
    var items;
    
    PresViewStore.addCurrentSlideListener.mock.calls[0][0](1);
    
    items = TestUtils.scryRenderedComponentsWithType(
      previews,
      PreviewsItem
    );
    
    expect(items[0].props.displayed).toBeFalsy();
    expect(items[1].props.displayed).toBeTruthy();
  });
});
