'use strict';

import React from 'react';
import ListPres from './ListPres/ListPres.js';
import Menu from './Menu/Menu.js';

export default React.createClass({
  /**
   * Rendering component to html
   */
  render() {
    return (
      <div className="listPage">
        <Menu />
        <ListPres />
      </div>
    );
  }
});
