'use strict';

export default {
  /**
   * Try get presentation slides from local storage
   * @param {number} id
   * @returns {array?}
   */
  getSlides(id) {
    var slides = localStorage.getItem(getSlidesName(id));
    
    if (slides) {
      slides = JSON.parse(slides);
    }
    
    return slides;
  },
  
  /**
   * Save slides for presentation
   * @param {number} id
   * @param {array} slides
   */
  saveSlides(id, slides) {
    slides = JSON.stringify(slides);
    
    localStorage.setItem(getSlidesName(id), slides);
  },
  
  /**
   * Try get presentations from local storage
   * @returns {array?}
   */
  getPresentations() {
    var presentations = localStorage.getItem('presentations');
    
    if (presentations) {
      presentations = JSON.parse(presentations);
    }
    
    return presentations;
  },
  
  /**
   * Save presentations
   * @param {array} presentations
   */
  savePresentations(presentations) {
    presentations = JSON.stringify(presentations);
    
    localStorage.setItem('presentations', presentations);
  }
};

/**
 * @param {number} id
 * @returns {string}
 */
function getSlidesName(id) {
  return 'slides' + id;
}
