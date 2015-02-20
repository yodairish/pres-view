'use strict';

import EventEmmiter from 'events';

var PresListStore = Object.assign({}, EventEmmiter.prototype, {
  favorites: false,
  
  /**
   * Add new listener for loading new part of presentations list
   */
  addNextPartListener() {
    
  },
  
  /**
   * Remove listener for loading new part of presentations list
   */
  removeNextPartListener() {
    
  },
  
  /**
   * Return all available presentations
   */
  getAll() {
    return [];
  },
  
  /**
   * Return current status of active favorites list
   * @returns {boolean}
   */
  isFavorites() {
    return this.favorites;
  }
});

export default PresListStore;
