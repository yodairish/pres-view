'use strict';

import React from 'react';
import PresListStore from '../../../js/stores/PresListStore.js';
import ListPresItem from './ListPresItem/ListPresItem.js';
import LoadMore from './LoadMore/LoadMore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      items: PresListStore.getAll()
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
   * After loading next part update items list
   */
  onNextPart() {
    this.setState({
      items: PresListStore.getAll()
    });
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var items = this.state.items.map((item) => {
      return <ListPresItem id={item.id}
                           title={item.title}
                           img={item.img} />;
    }),
        emptyMessage = <p className="listPres-empty">
                          No any presentation
                        </p>;
                        
    if (items.length) {
      emptyMessage = '';
    }
    
    return (
      <div className="listPres">
        {items}
        {emptyMessage}
        <LoadMore />
      </div>
    );
  }
});
