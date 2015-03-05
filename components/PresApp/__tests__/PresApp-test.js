'use strict';

jest.dontMock('../../ListPage/ListPage.js');
jest.dontMock('../../ViewPage/ViewPage.js');
jest.dontMock('../PresApp.js');

import React from 'react/addons';
import PresApp from '../PresApp.js';
import ListPage from '../../ListPage/ListPage.js';
import ViewPage from '../../ViewPage/ViewPage.js';
import PresViewStore from '../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('Pres component', () => {
  var presApp;
  
  beforeEach(() => {
    PresViewStore.getVisibility.mockReturnValue(false);
    
    PresViewStore.addVisibilityListener.mockClear();
    
    presApp = TestUtils.renderIntoDocument(
      <PresApp />
    );
  });
  
  it('Show list page without view mode', () => {
    var listPage = TestUtils.scryRenderedComponentsWithType(
          presApp,
          ListPage
        ),
        viewPage = TestUtils.scryRenderedComponentsWithType(
          presApp,
          ViewPage
        );
    
    expect(listPage.length).toBe(1);
    expect(viewPage.length).toBe(0);
  });
  
  it('Show view page on view mode', () => {
    var listPage,
        viewPage;
    
    PresViewStore.getVisibility.mockReturnValue(true);
    PresViewStore.addVisibilityListener.mock.calls[0][0]();
    
    listPage = TestUtils.scryRenderedComponentsWithType(
      presApp,
      ListPage
    );
    
    viewPage = TestUtils.scryRenderedComponentsWithType(
      presApp,
      ViewPage
    );
    
    expect(listPage.length).toBe(0);
    expect(viewPage.length).toBe(1);
  });
});
