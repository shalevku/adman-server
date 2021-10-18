//    Models
import Sequelize from 'sequelize'
// Define the sequelize connection to Mysql.
const sequelize = new Sequelize('admandb', 'root', 'Aa123456', {
  host: 'localhost',
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
