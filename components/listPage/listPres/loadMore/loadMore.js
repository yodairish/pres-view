'use strict';

import React from 'react';
import PresListStore from '../../../js/stores/presListStore.js';
import PresListActions from '../../../js/actions/presListActions.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      loading: false
    };
  },
  
  /**
   * When component into the DOM
   * Start listening getting next part items of list
   */
  componentDidMount() {
    PresListStore.addNextPartListener(this.onNextPart);
  },
  
  /**
   * When component remove from DOM
   * Stop listening getting next part items of list
   */
  componentWillUnmount() {
    PresListStore.removeNextPartListener(this.onNextPart);
  },
  
  /**
   * Renderig component html
   */
  render() {
    var cx = React.addons.classSet,
        buttonClasses = cx({
          'loadMore-button': true,
          hidden: this.state.loading
        }),
        loaderClasses = cx({
          'loadMore-loader': true,
          hidden: !this.state.loading
        });
    
    return (
      <div class="loadMore">
        <button class={buttonClasses}
                onClick={this.onClick}>Load More</button>
        <span class={loaderClasses}></span>
      </div>
    );
  },
  
  /**
   * After loading next part turn off spinner
   */
  onNextPart() {
    this.setState({
      loading: false
    });
  },
  
  /**
   * Show spinner and send request for getting new part
   */
  onClick() {
    this.setState({
      loading: true
    });
    
    PresListActions.loadMore();
  }
});
