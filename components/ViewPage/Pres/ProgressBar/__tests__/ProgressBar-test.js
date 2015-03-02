'use strict';

jest.dontMock('../ProgressBar.js');

import React from 'react/addons';
import ProgressBar from '../ProgressBar.js';
import PresViewStore from '../../../../../js/stores/PresViewStore.js';

var TestUtils = React.addons.TestUtils;

describe('ProgressBar Component', () => {
  var progressBarFill,
      progressCallback;
      
  beforeEach(() => {
    var progressBar;
    
    PresViewStore.addProgressListener.mockClear();
    
    progressBar = TestUtils.renderIntoDocument(
                       <ProgressBar />
                     );
    
    progressBarFill = TestUtils.findRenderedDOMComponentWithClass(
                       progressBar,
                       'progressBar-fill'
                     ).getDOMNode();

    progressCallback = PresViewStore.addProgressListener.mock.calls[0][0];
  });
  
  it('Create with empty progress', () => {
    expect(progressBarFill.style.width).toBe('0%');
  });
  
  it('Update progress', () => {
    progressCallback(33);
    expect(progressBarFill.style.width).toBe('33%');
  });
});
