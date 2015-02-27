'use strict';

import appDispatcher from '../dispatcher/appDispatcher.js';
import {ACTIONS_PRES_VIEW} from '../constants.js';

export default {
  /**
   * Open new presentation
   */
  open() {
    appDispatcher.dispatch({
      type: ACTIONS_PRES_VIEW.OPEN
    });
  }
};
