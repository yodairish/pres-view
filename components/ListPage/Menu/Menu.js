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
          'menu-button': true,
          'favorites--active': this.state.favorites
        });
    
    return (
      <div className="menu">
        <span className={favoritesClasses}
                onClick={this.showFavorites}>
          <span className="favorites-star"></span>
          <span className="favorites-star"></span>
        </span>
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
