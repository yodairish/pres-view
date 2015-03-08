'use strict';

jest.dontMock('../SideBar/SideBar.js');
jest.dontMock('../ViewPage.js');

import React from 'react/addons';
import ViewPage from '../ViewPage.js';
import SideBar from '../SideBar/SideBar.js';
import PresViewStore from '../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('Pres component', () => {
  var viewPage;
  
  beforeEach(() => {
    PresViewStore.getFullscreeStatus.mockReturnValue(false);
    PresViewStore.getLoadingStatus.mockReturnValue(false);
    
    PresViewStore.addFullscreenListener.mockClear();
    
    viewPage = TestUtils.renderIntoDocument(
      <ViewPage />
    );
  });
  
  it('Hide sidebar in fullscreen mode', () => {
    var sideBar = TestUtils.scryRenderedComponentsWithType(
          viewPage,
          SideBar
        );
    
    expect(sideBar.length).toBe(1);
    
    PresViewStore.getFullscreeStatus.mockReturnValue(true);
    PresViewStore.addFullscreenListener.mock.calls[0][0]();
    
    sideBar = TestUtils.scryRenderedComponentsWithType(
      viewPage,
      SideBar
    );
    
    expect(sideBar.length).toBe(0);
  });
  
  it('If loading, when show spinner', () => {
    var spinner;
    
    PresViewStore.getLoadingStatus.mockReturnValue(true);
    
    viewPage = TestUtils.renderIntoDocument(
      <ViewPage />
    );
    
    spinner = TestUtils.scryRenderedDOMComponentsWithClass(
      viewPage,
      'spinner'
    );
    
    expect(spinner.length).toBe(1);
  });
});
