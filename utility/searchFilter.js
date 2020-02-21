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
    insert(connection,`INSERT INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${filteredResults.toString()}')`)
  }
  if (filteredResults.length == 0) {
    console.log(searchResults.toString());
    insert(connection,`INSERT INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${searchResults.toString()}')`)
    return {filteredResults: searchResults.slice(0,10), filterSuccess: false}
  }
  return {filteredResults: filteredResults.slice(0, 10), filterSuccess: true}
}

function insert(connection, SQLquery) {
  // connection.query(SQLquery, (err, data) => {
  //   if (err) console.log(err)
  // })
}

module.exports = searchFilter