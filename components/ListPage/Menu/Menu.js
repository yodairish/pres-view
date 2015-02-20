'use strict';

import React from 'react/addons';
import PresListStore from '../../../js/stores/PresListStore.js';
import PresListActions from '../../../js/actions/PresListActions.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      favorites: PresListStore.isFavorites()
    };
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var cx = React.addons.classSet,
        favoritesClasses = cx({
          'menu-favorites': true,
          'menu-favorites--active': this.state.favorites
        });
    
    return (
      <div className="menu">
        <button className={favoritesClasses}
                onClick={this.showFavorites}></button>
      </div>
    );
  },
  
  /**
   * Show only favorites 
   */
  showFavorites() {
    var favorites = !this.state.favorites;
    
    this.setState({
      favorites: favorites
    });
    
    PresListActions.showFavorites(favorites);
  }
});
