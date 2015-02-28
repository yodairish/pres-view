'use strict';

import React from 'react/addons';
import PresListStore from '../../../../js/stores/PresListStore.js';
import PresListActions from '../../../../js/actions/PresListActions.js';

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
    PresListStore.addLoadingListener(this.onChangeLoading);
  },
  
  /**
   * When component remove from DOM
   * Stop listening getting next part items of list
   */
  componentWillUnmount() {
    PresListStore.removeLoadingListener(this.onChangeLoading);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var cx = React.addons.classSet,
        buttonClasses = cx({
          'loadMore-button': true,
          hidden: this.state.loading
        }),
        loaderClasses = cx({
          spinner: true,
          hidden: !this.state.loading
        });
    
    return (
      <div className="loadMore">
        <button className={buttonClasses}
                onClick={this.onClick}>Load More</button>
        <span className={loaderClasses}></span>
      </div>
    );
  },
  
  /**
   * After loading next part turn off spinner
   */
  onChangeLoading(status) {
    this.setState({
      loading: status
    });
  },
  
  /**
   * Show spinner and send request for getting new part
   */
  onClick() {
    PresListActions.loadMore();
  }
});
