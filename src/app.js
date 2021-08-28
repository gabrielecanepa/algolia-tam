import Autocomplete from './components/autocomplete';

/**
 * @class SpencerAndWilliamsSearch
 * @description Application class to initialize a new autocomplete search
 */
class SpencerAndWilliamsSearch {
  /**
   * @constructor
   */
  constructor() {
    this._initSearch();
    this._registerEvents();
  }

  /**
   * @private
   * Creates a new autocomplete instance
   * @return {void}
   */
  _initSearch() {
    this.autocompleteDropdown = new Autocomplete();
  }

  /**
   * @private
   * Register events on the DOM
   * @return {void}
   */
  _registerEvents() {
    const autocomplete = document.querySelector('.autocomplete');
    const searchbox = document.querySelector('#searchbox input');

    searchbox.addEventListener('click', () => {
      autocomplete.style.display = 'block';
    });

    searchbox.addEventListener('blur', () => {
      autocomplete.style.display = 'none';
    });
  }
}

/**
 * @public
 * Creates a new application instance
 * @return {SpencerAndWilliamsSearch} Application instance
 */
const runApp = () => new SpencerAndWilliamsSearch();

// Run a new application
runApp();
