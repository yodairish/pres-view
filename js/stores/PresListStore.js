'use strict';

import EventEmmiter from 'events';

var PresListStore = Object.assign({}, EventEmmiter.prototype, {
  /**
   * Add new listener for loading new part of presentations list
   */
  addNextPartListener() {
    
  },
  
  /**
   * Remove listener for loading new part of presentations list
   */
  removeNextPartListener() {
    
  }
});

export default PresListStore;
