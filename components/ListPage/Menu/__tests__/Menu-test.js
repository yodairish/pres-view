'use strict';

jest.dontMock('../Menu.js');

import React from 'react/addons';
import Menu from '../Menu.js';
import PresListStore from '../../../../js/stores/PresListStore.js';
import PresListActions from '../../../../js/actions/PresListActions.js';

var TestUtils = React.addons.TestUtils;

describe('Menu component', function() {
  /**
   * Create new instance of <Menu> and get faforites there
   */
  function getFavorites() {
    var menu = TestUtils.renderIntoDocument(<Menu />);
    
    return TestUtils.findRenderedDOMComponentWithClass(
      menu,
      'menu-favorites'
    ).getDOMNode();
  }
  
  it('When initialized get status from store', () => {
    var favorites;
    
    PresListStore.isFavorites.mockReturnValue(false);
    favorites = getFavorites();
    expect(favorites.className).not.toContain('menu-favorites--active');
    
    PresListStore.isFavorites.mockReturnValue(true);
    favorites = getFavorites();
    expect(favorites.className).toContain('menu-favorites--active');
  });
  
  it('Favorites button call update status favorite list on/off', () => {
    PresListStore.isFavorites.mockReturnValue(false);
    PresListActions.showFavorites.mockClear();
    
    var favorites = getFavorites();
    
    expect(favorites.className).not.toContain('menu-favorites--active');
    
    TestUtils.Simulate.click(favorites);
    
    expect(favorites.className).toContain('menu-favorites--active');
    expect(PresListActions.showFavorites.mock.calls[0][0]).toBeTruthy();
  });
});
