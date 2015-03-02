'use strict';

import {EventEmitter} from 'events';
import {ACTIONS_PRES_LIST, STORES_PRES_LIST} from '../constants.js';
import appDispatcher from '../dispatcher/appDispatcher.js';
import loader from '../utils/loader.js';

var favoritesActive = false,
    loading = false,
    presentations = [],
    PresListStore;
    
PresListStore = Object.assign({}, EventEmitter.prototype, {
  
  /**
   * ============ CHANGE EVENTS ============
   */
  
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
   * Remove listener from updating the presentations list
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(STORES_PRES_LIST.CHANGE, callback);
  },
  
  // ========================================
  
  /**
   * ============ LOADING EVENTS ============
   */
  
  /**
   * Call all loading callbacks
   */
  emitLoading() {
    this.emit(STORES_PRES_LIST.LOADING, loading);
  },
  
  /**
   * Add new listener for change loading status
   * @param {function} callback
   */
  addLoadingListener(callback) {
    this.on(STORES_PRES_LIST.LOADING, callback);
  },
  
  /**
   * Remove listener from change loading status
   * @param {function} callback
   */
  removeLoadingListener(callback) {
    this.removeListener(STORES_PRES_LIST.LOADING, callback);
  },
  
  // ========================================
  
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
      loading = true;
      PresListStore.emitLoading();
      loader.getNextItems(PresListStore.getCount());
      break;
    }
    case ACTIONS_PRES_LIST.GET_NEW_ITEMS: {
      presentations = presentations.concat(action.items);
      
      PresListStore.emitChange();
      
      loading = false;
      PresListStore.emitLoading();
      break;
    }
    case ACTIONS_PRES_LIST.GET_NEW_ITEMS_ERROR: {
      loading = false;
      PresListStore.emitLoading();
      break;
    }
    case ACTIONS_PRES_LIST.FAVORITES: {
      favoritesActive = !!action.active;
      
      PresListStore.emitChange();
      break;
    }
    case ACTIONS_PRES_LIST.TOGGLE_FAVORITE: {
      toggleItemFavorite(action.id);
      
      PresListStore.emitChange();
      break;
    }
  }
});

/**
 * Toggle favorite status for item
 * @param {number} id
 */
function toggleItemFavorite(id) {
  var index = findItemById(id);
  
  if (index >= 0) {
    presentations[index].favorite = !presentations[index].favorite;
  }
}

/**
 * Find item index by id
 * @param {number} id
 * @returns {number}
 */
function findItemById(id) {
  var index = -1,
      length = presentations.length,
      i;
  
  for (i = 0; i < length; i++) {
    if (presentations[i].id === id) {
      index = i;
      break;
    }
  }
  
  return index;
}

export default PresListStore;
