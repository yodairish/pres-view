'use strict';

import {EventEmitter} from 'events';
import {ACTIONS_PRES_LIST, STORES_PRES_LIST} from '../constants.js';
import appDispatcher from '../dispatcher/appDispatcher.js';
import loader from '../utils/loader.js';

var favoritesActive = false,
    presentations = [],
    PresListStore;
    
PresListStore = Object.assign({}, EventEmitter.prototype, {
  /**
   * Call all change callbacks
   */
  emitChange() {
    this.emit(STORES_PRES_LIST.CHANGE);
  },
  
  /**
   * Add new listener for updating the presentations list
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(STORES_PRES_LIST.CHANGE, callback);
  },
  
  /**
   * Remove listener for updating the presentations list
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(STORES_PRES_LIST.CHANGE, callback);
  },
  
  /**
   * Return all available presentations
   * @returns {array}
   */
  getAll() {
    var allPres = presentations;
    
    if (this.isFavorites()) {
      allPres = allPres.filter((pres) => {
        return !!pres.favorite;
      });
    }
    
    return allPres;
  },
  
  /**
   * Return current status of active favorites list
   * @returns {boolean}
   */
  isFavorites() {
    return favoritesActive;
  },
  
  /**
   * Getting count of presentations
   * @returns {number}
   */
  getCount() {
    return presentations.length;
  }
});

PresListStore.dispatchToken = appDispatcher.register((action) => {
  switch (action.type) {
    case ACTIONS_PRES_LIST.LOAD_MORE: {
      loader.getNextItems(PresListStore.getCount());
      console.dir(loader.getNextItems);
      break;
    }
    case ACTIONS_PRES_LIST.GET_MEW_ITEMS: {
      presentations = presentations.concat(action.items);
      
      PresListStore.emitChange();
      break;
    }
    case ACTIONS_PRES_LIST.FAVORITES: {
      favoritesActive = !!action.active;
      
      PresListStore.emitChange();
      break;
    }
  }
});

export default PresListStore;
