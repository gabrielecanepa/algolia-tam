import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import {
  hits,
  searchBox,
  configure,
  index,
  poweredBy,
} from 'instantsearch.js/es/widgets';

// Autocomplete Templates
import autocompleteProductTemplate from '../templates/autocomplete-product';
import autocompleteSuggestionTemplate from '../templates/autocomplete-suggestion';

/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.APPLICATION_ID,
      process.env.API_KEY
    );

    this._searchInstance = instantsearch({
      indexName: process.env.INDEX_NAME,
      searchClient: this._searchClient,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      // Index
      configure({
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
        placeholder: 'Search for products',
        autofocus: true,
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
      // Query Suggestions Index
      index({
        indexName: process.env.QS_INDEX_NAME,
      }).addWidgets([
        configure({
          hitsPerPage: 10,
        }),
        hits({
          container: '#autocomplete-suggestions',
          templates: {
            item: autocompleteSuggestionTemplate,
            empty: 'No suggestions',
          },
        }),
      ]),
      // Powered by Algolia banner
      poweredBy({
        container: '#autocomplete-footer',
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default Autocomplete;
