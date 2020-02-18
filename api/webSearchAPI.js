var unirest = require("unirest");

async function search(keyword) {
  var req = unirest("GET", "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI");

  req.query({
    "autoCorrect": "true",
    "pageNumber": "1",
    "pageSize": "10",
    "q": keyword,
    "safeSearch": "false"
  });
  
  req.headers({
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": "355cde6390msha1726285c45f6e1p1835bbjsn580de4e72e15"
  });
  
  
  req.end(function (res) {
    if (res.error) {
      console.log('webSearchAPI file', res.code);
      throw new Error(res.error);
    }
  });
  
  return req.then((res) => {
    return res
  })
}

module.exports.search = search

