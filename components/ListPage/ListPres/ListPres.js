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
   * After changing presentation list update items list
   */
  onChange() {
    this.setState({
      items: PresListStore.getAll()
    });
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var items = this.state.items.map((item) => {
      return <ListPresItem key={item.id}
                           id={item.id}
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
