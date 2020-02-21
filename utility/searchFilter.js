function searchFilter(connection, searchResults, filterKeywords, userId) {
  let filteredResults = [];
  searchResults.forEach(sr => {
    filterKeywords.forEach(kw => {
      const regKW = new RegExp(kw, 'i')
      if (sr.description.search(regKW) != -1 || sr.body.search(regKW) != -1) {
        filteredResults.push(sr)
      }
    });
  })
  if (filteredResults.length > 10) {
    insert(connection,`INSERT INTO temp_search_result(userId, searchresults) VALUES('${userId}', '${filteredResults}')`)
  }
  if (filteredResults.length == 0) {
    insert(connection,`INSERT INTO temp_search_result(userId, searchresults) VALUES('${userId}', '${searchResults}')`)
    return searchResults.slice(0,10), false
  }
  return filteredResults.slice(0, 10), true
}

function insert(connection, SQLquery) {
  connection.query(SQLquery, (err, data) => {
    if (err) console.log(errr)
  })
}

module.exports = searchFilter