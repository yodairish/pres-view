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
                            OPEN: null,
                            CLOSE: null,
                            SHOW_SLIDE: null,
                            GET_SLIDES: null,
                            FULL_SCREEN: null,
                            TOGGLE_FAVORITE: null
                          }),
      STORES_PRES_LIST = keyMirror({
                            CHANGE: null
                          }),
      STORES_PRES_VIEW = keyMirror({
                            VISIBILITY: null,
                            SLIDE_LIST: null,
                            PROGRESS: null,
                            CURRENT_SLIDE: null,
                            FULL_SCREEN: null
                          });

export default {
  ACTIONS_PRES_LIST: ACTIONS_PRES_LIST,
  ACTIONS_PRES_VIEW: ACTIONS_PRES_VIEW,
  STORES_PRES_LIST: STORES_PRES_LIST,
  STORES_PRES_VIEW: STORES_PRES_VIEW
};
