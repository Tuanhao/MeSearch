const express = require('express')
const path = require('path')
const mysql = require('mysql')
const webSearchApi = require('./api/webSearchAPI')
const config = require('./utility/mySQLconfig')
const searchFilter = require('./utility/searchFilter')
const bcrypt = require('bcrypt')
const {PythonShell} = require('python-shell')

const app = express();

const connection = mysql.createConnection(config)

connection.connect((err) => {
  if (err) console.log(err)
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(express.json())

// Put all API endpoints under '/api'

/**
 * Login end point - with bcrypt authentication
 * POST
 * 
 * Request body: {username, password}
 * RESPONSE:
 * 500: Dabase query failed
 * 401: For not incorrect info
 * 200: Success
 */
app.post('/api/login', (req, res) => {
  const {username, password} = req.body
  let loginSQL = `SELECT * FROM user_account WHERE username='${username}'`
 
  connection.query(loginSQL, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        msg: 'Database query failed'
      })
    } else {
      bcrypt.compare(password, data[0].password, function(err, result) {
        console.log(data[0]);
        if (result) {
          res.status(200).json({
            userId: data[0].userId
          })
        } else {
          res.status(401).json({
            msg: 'Authentication failed'
          })
        }
      });
    }
  })
})

/**
 * Register an account - encrypt password before putting into DB
 * POST
 * 
 * Request body: {username, password, sports, books, games, movies, music, television}
 * RESPONSE:
 * 500: User name duplicated
 * 500: Databse failed to insert info
 * 200: Success
 */
app.post('/api/register', (req, res) => {
  const {username, password, sports, books, games, movies, music, television} = req.body;
  let userId
  const saltRounds = 3;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      let registerAccSQL = 
      `INSERT INTO user_account(username, password)
      VALUES('${username}', '${hash}')`
    
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
                msg: 'Database failed to insert info',
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
    }
  })
  
  
});

/**
 * Perform a search
 * POST
 * 
 * Request body: {userId, category, keyword}
 * RESPONSE:
 * 500: Fail to perform search (search engine API is not responding)
 * 200: Success
 */
app.post('/api/search', (req, res) => {

  let userId = 20
  let category = 'smart'
  let searchKeyword = 'Donald Trump'
  let filterKeywords
  if (req.body.userId) {
    userId = req.body.userId
    category = req.body.category
    searchKeyword = req.body.keyword
  }
  // smart search
  if (category == 'smart') {
    PythonShell.run('./AI_Drive/wikisearch.py', {args: [searchKeyword]}, (err, results) => {
      if (err) throw err
      filterKeywords = results.slice(-1)[0].split(/[' ,]/).filter((value)=> value.length>2)
      webSearchApi.search(searchKeyword).then((result) => {
        return result.body.value
      }).then((searchResults) => {
        const {filteredResults, filterSuccess} = searchFilter(connection, searchResults, filterKeywords, userId)
        res.status(200).json({filteredResults, filterSuccess})
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: 'Fail to perform search, please try again'
        })
      })
    })
  } else {
    let loginSQL = `SELECT ${category} FROM user_profile WHERE userId='${userId}'`
 
    connection.query(loginSQL, (err, data) => {
      // if no errors, then split the data from DB into an array 
      err? console.log(err): filterKeywords = data[0][`${category}`].split(',');
      
      webSearchApi.search(searchKeyword).then((result) => {
        return result.body.value
      }).then((searchResults) => {
        const {filteredResults, filterSuccess} = searchFilter(connection, searchResults, filterKeywords, userId)
        res.status(200).json({filteredResults, filterSuccess})
      }).catch((err) => {
        res.status(500).json({
          msg: 'Fail to perform search, please try again'
        })
      })
    })
  }
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
});

const port = process.env.PORT || 5000;
app.listen(port)

console.log(`listening on ${port}`)