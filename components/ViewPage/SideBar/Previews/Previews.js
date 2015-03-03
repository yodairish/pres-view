'use strict';

import React from 'react';
import PreviewItem from './PreviewItem/PreviewItem.js';
import PresViewStore from '../../../../js/stores/PresViewStore.js';

export default React.createClass({
  /**
   * Set default state
   */
  getInitialState() {
    return {
      items: PresViewStore.getSlides(),
      displayedItem: -1
    };
  },
  
  /**
   * When component into the DOM
   * Start listening updating list of slides
   */
  componentDidMount() {
    PresViewStore.addSlideListListener(this.onNewSlides);
    PresViewStore.addCurrentSlideListener(this.onSetDisplayed);
  },
  
  /**
   * When component remove from DOM
   * Stop listening updating list of slides
   */
  componentWillUnmount() {
    PresViewStore.removeSlideListListener(this.onNewSlides);
    PresViewStore.removeCurrentSlideListener(this.onSetDisplayed);
  },
  
  /**
   * Rendering component to html
   */
  render() {
    var items = this.state.items.map((item, index) => {
      var displayed = (index === this.state.displayedItem);
      
      return (
        <PreviewItem key={'item' + index}
                     img={item.img}
                     position={index + 1}
                     displayed={displayed} />
      );
    }, this);
    
    return (
      <div className="preview">
        {items}
      </div>
    );
  },
  
  /**
   * Update slides
   */
  onNewSlides() {
    this.setState({
      items: PresViewStore.getSlides(),
      displayedItem: this.state.displayedItem
    });
  },
  
  /**
   * Changing displayed slide
   */
  onSetDisplayed(currentSlide) {
    this.setState({
      items: this.state.items,
      displayedItem: currentSlide
    });
  }
});
