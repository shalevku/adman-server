//    Models
import Sequelize from 'sequelize'

// Extract ClearDB credentials from Heroku config vars.
const dbUrl = process.env.CLEARDB_DATABASE_URL
const delimiters = [
  dbUrl.indexOf('//'),
  dbUrl.lastIndexOf(':'),
  dbUrl.indexOf('@'),
  dbUrl.lastIndexOf('/'),
  dbUrl.indexOf('?')
]
const username = dbUrl.slice(delimiters[0] + 2, delimiters[1])
const password = dbUrl.slice(delimiters[1] + 1, delimiters[2])
const host = dbUrl.slice(delimiters[2] + 1, delimiters[3])
const database = dbUrl.slice(delimiters[3] + 1, delimiters[4])
console.log('db credentials')
console.log(username)
console.log(password)
console.log(host)
console.log(database)
// Define the sequelize connection to Mysql.
const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    port: 3306,
    dialect: 'mysql',
    define: { freezeTableName: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  }
)

export { sequelize }

//    Testing the db connection
try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
// TODO
// * check how to stop the server if a connection to the db didn't succeed.
// * see if I need sequelize.close().
// * file.originalname can be dangerous because I have no control over the length the
// use sends me.
