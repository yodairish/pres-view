'use strict';

import React from 'react';
import ViewPresActions from '../../../../js/actions/ViewPresActions.js';

export default React.createClass({
  /**
   * Define types for props
   */
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string,
    img: React.PropTypes.string
  },
  
  /**
   * Set default values
   */
  getDefaultProps() {
    return {
      title: '',
      img: ''
    };
  },
  
  /**
   * Rendering component to html
   */
  render() {
    return (
      <div className="listPresItem"
           onClick={this.onClick}>
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
  }
});
