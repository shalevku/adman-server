import { sequelize } from '../config/db.config.js'
// Defining models' associations.
import User from './User.model.js'
import Ad from './Ad.model.js'
User.hasMany(Ad, {
  foreignKey: {
    allowNull: false
  },
  onDelete: 'CASCADE'
})
// Synching all models to the database.
sequelize.sync({alter: true})
// Arrange the models for a more convenient export (other than sequelize.models).
export { User, Ad }

//    TODOs
// * try export with object.keys with spread operator (...)
