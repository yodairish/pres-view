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
                )
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
        favoritesClasses = cx({
          'control-button': true,
          'control--active': this.state.favorite
        });
    
    return (
      <div className="sideControls">
        <span className="control-button"
              onClick={this.onClose}>
          <span className="back-arrow"></span>
        </span>
        <span className={favoritesClasses}
              onClick={this.onFavorite}>
          <span className="favorites-star"></span>
        </span>
        <span className="control-button"
              onClick={this.onFullScreen}>
          <span className="fullscreen"></span>
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
                )
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
  }
});
