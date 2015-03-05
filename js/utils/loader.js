'use strict';

import 'whatwg-fetch';
import PresListActions from '../actions/PresListActions.js';
import ViewPresActions from '../actions/ViewPresActions.js';

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
      .then(handleResponse)
      .then(handleNewItems)
      .catch((error) => {
        PresListActions.getNewItemsError(error);
      });
  },
  
  /**
   * Get slide for presentation
   * @param {number} id
   */
  getSlides(id) {
    var url = './pres/slides/slides' + id + '.json';
    
    fetch(url)
      .then(handleResponse)
      .then(handleSlides)
      .catch((error) => {
        ViewPresActions.getSlidesError(error);
      });
  },
  
  /**
   * Toggle favorite status for item
   * @param {number} id
   */
  toggleItemFavorite(id) {
    // here should be request to server
    
    console.log('Toggle favorire: ', id);
  }
};

/**
 * Handle response
 * @param {Object} response
 * @return {object|array}
 */
function handleResponse(response) {
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

/**
 * Handle array with slides
 * @param {array|object} slides
 */
function handleSlides(slides) {
  if (Array.isArray(slides)) {
    ViewPresActions.getSlides(slides);
    
  } else {
    ViewPresActions.getSlides({
      message: 'Incorrect slides list'
    });
  }
}
