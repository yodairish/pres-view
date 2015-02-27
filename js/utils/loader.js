'use strict';

import 'whatwg-fetch';
import PresListActions from '../actions/PresListActions.js';

var fetch = self.fetch;

// In this app we don't have a server side, so just require static files
export default {
  /**
   * Fetch new data from the server
   * @param {number=} count
   */
  getNextItems(count) {
    var url = './pres/presList' + (count ? count : '') + '.json';
    
    fetch(url)
      .then(handleNewItemsResponse)
      .then(handleNewItems)
      .catch((error) => {
        PresListActions.getNewItemsError(error);
      });
  }
};

/**
 * Handle getting new items
 * @param {Object} response
 * @return {object|array}
 */
function handleNewItemsResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
    
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

/**
 * Handle array with new items
 * @param {array|object} items
 */
function handleNewItems(items) {
  if (Array.isArray(items)) {
    PresListActions.getNewItems(items);
    
  } else {
    PresListActions.getNewItemsError({
      message: 'Incorrect items list'
    });
  }
}
