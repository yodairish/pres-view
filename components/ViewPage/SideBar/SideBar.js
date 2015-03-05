'use strict';

import React from 'react';
import Previews from './Previews/Previews.js';
import SideControls from './SideControls/SideControls.js';

export default React.createClass({
  /**
   * Rendering component to html
   */
  render() {
    return (
      <div className="sideBar">
        <SideControls />
        <Previews />
      </div>
    );
  }
});
