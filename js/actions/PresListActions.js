'use strict';

import appDispatcher from '../dispatcher/appDispatcher.js';
import {ACTIONS_PRES_LIST} from '../constants.js';

export default {
  /**
   * Create action for loading new part of presentations list
   */
  loadMore() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_LIST.LOAD_MORE
    });
  },
  
  /**
   * Create action for showing only favorites
   * @param {boolean} active
   */
  showFavorites(active) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_LIST.FAVORITES,
      active: active
    });
  },
  
  /**
   * Create action for getting new items
   * @param {array} items
   */
  getNewItems(items) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_LIST.GET_MEW_ITEMS,
      items: items
    });
  },
  
  /**
   * Create action for error until getting new items
   * @param {object} error
   */
  getNewItemsError(error) {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_LIST.GET_MEW_ITEMS_ERROR,
      error: error
    });
  }
};
