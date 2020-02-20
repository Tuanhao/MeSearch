function searchFilter(searchResults, filterKeywords) {
  let filteredResults = [];
  searchResults.forEach(sr => {
    filterKeywords.forEach(kw => {
      const regKW = new RegExp(kw, 'i')
      if (sr.description.search(regKW) != -1 || sr.body.search(regKW) != -1) {
        filteredResults.push(sr)
      }
    });
  })
  return filteredResults
}

module.exports = searchFilter