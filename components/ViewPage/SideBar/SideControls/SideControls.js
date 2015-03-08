'use strict';

import React from 'react/addons';
import ViewPresActions from '../../../../js/actions/ViewPresActions.js';
import PresListActions from '../../../../js/actions/PresListActions.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';
import PresListStore from '../../../../js/stores/PresListStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      favorite: PresListStore.isFavoritePresentation(
                  PresViewStore.getId()
                ),
      menu: false
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating list of items
   */
  componentDidMount() {
    PresListStore.addChangeListener(this.onChange);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating list of items
   */
  componentWillUnmount() {
    PresListStore.removeChangeListener(this.onChange);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var cx = React.addons.classSet,
        sideControlsClasses = cx({
          sideControls: true,
          'sideControls--active': this.state.menu
        }),
        favoritesClasses = cx({
          'control-button': true,
          'control--active': this.state.favorite
        }),
        sandwich = cx({
          sandwich: !this.state.menu,
          'sandwich-close': this.state.menu
        }),
        backClasses = 'control-button sideControls-back',
        menuClasses = 'control-button sideControls-menu';
    
    return (
      <div className={sideControlsClasses}>
        <span className={backClasses}
              onClick={this.onClose}>
          <span className="back-arrow"></span>
        </span>
        <span className={favoritesClasses}
              onClick={this.onFavorite}>
          <span className="favorites-star"></span>
        </span>
        <span className="control-button"
              onClick={this.onFullScreen}>
          <span className="fullscreen">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </span>
        <span className={menuClasses}
              onClick={this.onToggleMenu}>
          <span className={sandwich}></span>
        </span>
      </div>
    );
  },
  
  /**
   * Update favorite status after updating presentation list
   */
  onChange() {
    this.setState({
      favorite: PresListStore.isFavoritePresentation(
                  PresViewStore.getId()
                ),
      menu: this.state.menu
    });
  },
  
  /**
   * Close opened presentation
   */
  onClose() {
    ViewPresActions.close();
  },
  
  /**
   * Toggle favorite status for the presentation
   */
  onFavorite() {
    PresListActions.toggleFavoriteStatus(PresViewStore.getId());
  },
  
  /**
   * Activate full screen mode
   */
  onFullScreen() {
    ViewPresActions.fullscreen(true);
  },
  
  /**
   * Toggle active mobile menu
   */
  onToggleMenu() {
    this.setState({
      favorite: this.state.favorite,
      menu: !this.state.menu
    });
  }
});
