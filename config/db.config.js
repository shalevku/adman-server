//    Models
import Sequelize from 'sequelize'

// // Extract ClearDB credentials from Heroku config vars.
// let tail = process.env.CLEARDB_DATABASE_URL.slice(8,-1)
// const database = tail.slice(0, tail.indexOf(':'))
// tail = tail.slice()

// Define the sequelize connection to Mysql.
const sequelize = new Sequelize('heroku_c2f491eba27d970', 'b907931e57d0ff', 'f3ce955f', {
  host: 'us-cdbr-east-04.cleardb.com',
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
})

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
