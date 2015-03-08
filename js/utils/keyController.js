'use strict';

import ViewPresActions from '../actions/ViewPresActions.js';

export default {
  /**
   * Start listening for keyboard eventes
   */
  startListen() {
    document.addEventListener('keydown', processKey);
  },
  
  /**
   * Stop listening for keyboard eventes
   */
  stopListen() {
    document.removeEventListener('keydown', processKey);
  }
};

/**
 * Processing key press
 */
function processKey(e) {
  var key = e.which;
  console.log(key);
  
  if (key === 39 || key === 32) {
    ViewPresActions.next();
    
  } else if (key === 37) {
    ViewPresActions.prev();
    
  } else if (key === 27) {
    ViewPresActions.fullscreen(false);
  }
}
