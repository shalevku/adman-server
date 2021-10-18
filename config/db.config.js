//    Models
import Sequelize from 'sequelize'
// Define the sequelize connection to Mysql.
const sequelize = new Sequelize('heroku_77a67cd88d78e4f', 'b19a6b85238d18', '52fafa2f', {
  host: 'mysql://b19a6b85238d18:52fafa2f@us-cdbr-east-04.cleardb.com/heroku_77a67cd88d78e4f?reconnect=true',
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
