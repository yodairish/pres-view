'use strict';

jest.dontMock('../../constants.js');
jest.dontMock('../ViewPresActions.js');

import {ACTIONS_PRES_VIEW} from '../../constants.js';
import appDispatcher from '../../dispatcher/appDispatcher.js';
import PresListActions from '../ViewPresActions.js';

describe('Action creator for presentation view', () => {
  beforeEach(() => {
    appDispatcher.dispatch.mockClear();
  });
  
  it('Open new presentation action', () => {
    PresListActions.open();
    
    var action = appDispatcher.dispatch.mock.calls[0][0];
    
    expect(action.type).toBe(ACTIONS_PRES_VIEW.OPEN);
  });
});
