'use strict';

import React from 'react/addons';
import PresListActions from '../../../../js/actions/PresListActions.js';
import ViewPresActions from '../../../../js/actions/ViewPresActions.js';

export default React.createClass({
  /**
   * Define types for props
   */
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    img: React.PropTypes.string,
    favorite: React.PropTypes.bool
  },
  
  /**
   * Set default values
   */
  getDefaultProps() {
    return {
      title: '',
      img: '',
      favorite: false
    };
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var cx = React.addons.classSet,
        favoritesClasses = cx({
          'listPresItem-favorite': true,
          'favorites--active': this.props.favorite
        });
    
    return (
      <div className="listPresItem"
           onClick={this.onClick}>
        <span className={favoritesClasses}
              onClick={this.addToFavorites}>
          <span className="favorites-star"></span>
          <span className="favorites-star"></span>
        </span>
        <div className="listPresItem-img">
          <img src={this.props.img}
               alt={this.props.title} />
        </div>
        <p className="listPresItem-title">
          {this.props.title}
        </p>
      </div>
    );
  },
  
  /**
   * Open current presentation
   */
  onClick() {
    ViewPresActions.open(this.props.id);
  },
  
  /**
   * Add/remove current presentation to favorites
   */
  addToFavorites() {
    PresListActions.toggleFavoriteStatus(this.props.id);
  }
});
