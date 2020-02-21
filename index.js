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

app.use(express.json())

// Put all API endpoints under '/api'
app.post('/api/login', (req, res) => {
  const username = 'user'
  const password = 'password'
  let loginSQL = `SELECT * FROM user_account WHERE username='${username}' AND password='${password}'`
 
  connection.query(loginSQL, (err, data) => {
    if (err) {
      console.log(err)
      res.status(401).json({
        msg: 'Fail to login'
      })
    } else {
      res.status(200).json(data[0].userId)
    }
  })
})

app.post('/api/register', (req, res) => {
  const {username, password, sports, books, games, movies, music, television} = req.body;
  let userId = 0;

  let registerAccSQL = 
  `INSERT INTO user_account(username, password)
  VALUES('${username}', '${password}')`
 
  connection.query(registerAccSQL, (err, data) => {
    if(err) {
      if (err.errno == 1062) res.status(500).json({
        status: 'ERROR',
        userId: 0,
        msg: 'username duplicated'
      })
    } else {
      userId = data.insertId
      let registerProfileSQL =
      `INSERT INTO user_profile(userId, sports, books, games, movies, music, television)
      VALUES(${userId}, '${sports}', '${books}', '${games}', '${movies}', '${music}', '${television}')`

      connection.query(registerProfileSQL, (err, data) => {
        if(err) {
          res.status(500).json({
            status: 'ERROR',
            userId,
            msg: 'Fail to register',
            err
          });
        } else {
          res.status(200).json({
            status: 'OK',
            userId
          });
        }
      })
    } 
  })
  
});

app.get('/api/search', (req, res) => {
  //TODO: check credentials

  let userId = 20
  let category = 'sports'
  let searchKeyword = 'Donald Trump'
  let filterKeywords
  if (req.body.userId) {
    userId = req.body.userId
    category = req.body.category
    searchKeyword = req.body.keyword
  }
  

  let loginSQL = `SELECT ${category} FROM user_profile WHERE userId='${userId}'`
 
  connection.query(loginSQL, (err, data) => { 
    err? console.log(err): filterKeywords = data[0][`${category}`].split(',');
    
    webSearchApi.search(searchKeyword).then((result) => {
      console.log(result.body.value);
      return result.body.value
    }).then((searchResults) => {
      const filteredResults = searchFilter(searchResults, filterKeywords)
      res.status(200).json(filteredResults)
    }).catch((err) => {
      res.status(500).json({
        msg: 'Failt to perform search, please try again'
      })
    })
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