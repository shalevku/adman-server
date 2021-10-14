// Define the User model.
import Sequelize from 'sequelize'
import { sequelize } from '../config/common.config.js'
const { Model, DataTypes } = Sequelize

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING(30)
    },
    name: {
      type: DataTypes.STRING(30)
    }
  },
  { sequelize, modelName: 'User' }
)

export default User
