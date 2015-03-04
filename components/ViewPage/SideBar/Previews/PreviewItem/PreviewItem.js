'use strict';

import React from 'react/addons';
import ViewPresActions from '../../../../../js/actions/ViewPresActions.js';

export default React.createClass({
  /**
   * Define types for props
   */
  propTypes: {
    img: React.PropTypes.string.isRequired,
    position: React.PropTypes.number.isRequired,
    displayed: React.PropTypes.bool
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var cx = React.addons.classSet,
        itemClasses = cx({
          'preview-item': true,
          'preview-item--displayed': this.props.displayed
        });
    
    return (
      <div className={itemClasses}
           onClick={this.onClick}>
        <img className="preview-img"
             src={this.props.img} />
        <span className="preview-position">
          {this.props.position}
        </span>
      </div>
    );
  },
  
  /**
   * Open current slide
   */
  onClick() {
    ViewPresActions.showSlide(this.props.position - 1);
  }
});
