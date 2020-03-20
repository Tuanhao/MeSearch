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
    // store the new results that is other than the first 10
    // splcie the first ten results then replace all apostrohe (') with ('') because database doesnt like it
    insert(connection,`REPLACE INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${JSON.stringify(filteredResults.splice(0, 10)).replace(/'/g,"''")}')`)
  }
  if (filteredResults.length == 0) {
    // no matches results, so return general results
    console.log(searchResults.toString());
    insert(connection,`REPLACE INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${JSON.stringify(searchResults.slice(0,10)).replace(/'/g,"''")}')`)
    return {filteredResults: searchResults.slice(0,10), filterSuccess: false}
  }
  return {filteredResults: filteredResults.slice(0, 10), filterSuccess: true}
}

function insert(connection, SQLquery) {
  connection.query(SQLquery, (err) => {
    if (err) console.log(err)
  })
}

module.exports = searchFilter