const express = require('express')
const path = require('path')
const mysql = require('mysql')
const webSearchApi = require('./api/webSearchAPI')
const config = require('./utility/mySQLconfig')
const searchFilter = require('./utility/searchFilter')

const app = express();

const connection = mysql.createConnection(config)

connection.connect((err) => {
  if (err) console.log(err)
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

// Put all API endpoints under '/api'
app.get('/api/login', (req, res) => {
  
  const username = 'user'
  const password = 'password'
  let loginSQL = `SELECT * FROM user_account WHERE username='${username}' AND password='${password}'`
 
  connection.query(loginSQL, (err, data) => {
    err? console.log(err): res.json({users: data});
  })

});

app.get('/api/register', (req, res) => {
  
  const username = 'user1'
  const password = 'password'
  let userid = 20
  const sports = ['123', '456']
  const books = ['123', '456']
  const games = ['123', '456']
  const movies = ['123', '456']
  const music = ['123', '456']
  const television = ['abc', 'def']

  let registerAccSQL = 
  `INSERT IGNORE INTO user_account(username, password)
  VALUES('${username}', '${password}')`
 
  connection.query(registerAccSQL, (err, data) => {
    // errorno == 1062 (duplicate error)
    if(err) {
      console.log(err)
      if (err.errno == 1062) res.json({msg: 'username duplicated'})
    } else {
      userid = data.userid
    } 
  })

  let registerProfileSQL =
  `INSERT INTO user_profile(userid, sports, books, games, movies, music, television)
  VALUES(${userid}, '${sports}', '${books}', '${games}', '${movies}', '${music}', '${television}')`

  connection.query(registerProfileSQL, (err, data) => {
    err? console.log(err): res.json({users: data});
  })
});

app.get('/api/search', (req, res) => {
  //TODO: check credentials

  // TODO: make query to find keyword
  // let loginSQL = `SELECT * FROM user_account WHERE username='${username}' AND password='${password}'`
 
  // connection.query(loginSQL, (err, data) => {
  //   err? console.log(err): res.json({users: data});
  // })
  
  const searchKeyword = 'Donald Trump'
  const filterKeywords = ['Australia', 'President', 'CNN'] 
  webSearchApi.search(searchKeyword).then((result) => {
    console.log(result.body.value);
    return result.body.value
  }).then((searchResults) => {
    const filteredResults = searchFilter(searchResults, filterKeywords)
    res.json(filteredResults)
  })
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`listening on ${port}`)