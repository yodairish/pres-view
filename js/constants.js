'use strict';

import keyMirror from 'keymirror';

const ACTIONS_PRES_LIST = keyMirror({
                            LOADING: null,
                            LOAD_MORE: null,
                            FAVORITES: null,
                            GET_NEW_ITEMS: null,
                            GET_NEW_ITEMS_ERROR: null,
                            TOGGLE_FAVORITE: null
                          }),
      ACTIONS_PRES_VIEW = keyMirror({
                            OPEN: null
                          }),
      STORES_PRES_LIST = keyMirror({
                            CHANGE: null
                          });

export default {
  ACTIONS_PRES_LIST: ACTIONS_PRES_LIST,
  ACTIONS_PRES_VIEW: ACTIONS_PRES_VIEW,
  STORES_PRES_LIST: STORES_PRES_LIST
};
