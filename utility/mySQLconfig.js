let config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER ||'root',
  password: process.env.DB_PW ||'mesearch123',
  database: process.env.DB_NAME ||'mesearch-general'
}

module.exports = config