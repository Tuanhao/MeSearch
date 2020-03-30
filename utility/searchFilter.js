/**
 * SearcFilter returns search results that has at least 1 filterKeywords in the description or body.
 * If there is no match, this will return the searchResults in the arguement 
 * and false in the filterSuccess property.
 * @param {*} connection Database connection
 * @param {Object[]} searchResults Array of search results
 * @param {string[]} filterKeywords Array of keywords
 * @param {number} userId User ID number
 * @returns {Object[], boolean} filteredResults: the resulting array; filterSuccess: true if there is any matches of filterKeywords
 */
function searchFilter(connection, searchResults, filterKeywords, userId) {
  let filteredResults = [];
  searchResults.forEach(sr => {
    if(filterKeywords.some(kw => {
      const regKW = new RegExp(kw, 'i')
      if (sr.description.search(regKW) != -1 || sr.body.search(regKW) != -1) {
        return true
      }
    })) {
      filteredResults.push(sr)
    }
  })
  if (filteredResults.length > 10) {
    // store the new results that is other than the first 10
    // splcie the first ten results then replace all apostrohe (') with ('') because database doesnt like it
    insert(connection,`REPLACE INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${JSON.stringify(filteredResults.slice(10)).replace(/'/g,"''")}')`)
    return {filteredResults: filteredResults.slice(0, 10), filterSuccess: true}
  }
  if (filteredResults.length == 0) {
    // no matches results, so return general results
    insert(connection,`REPLACE INTO temp_search_result(userId, searchResults) VALUES('${userId}', '${JSON.stringify(searchResults.slice(10)).replace(/'/g,"''")}')`)
    return {filteredResults: searchResults.slice(0,10), filterSuccess: false}
  }
  return {filteredResults: filteredResults, filterSuccess: true}
}

function insert(connection, SQLquery) {
  connection.query(SQLquery, (err) => {
    if (err) console.log(err)
  })
}

module.exports = searchFilter