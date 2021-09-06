const autocompleteSuggestion = hit => `
  <span class="autocomplete-suggestion" />
    ${hit._highlightResult.query.value}
  </span>
`;

export default autocompleteSuggestion;
