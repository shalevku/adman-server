// Define the Ad model.
import Sequelize from 'sequelize'
import { sequelize } from '../config/db.config.js'
const { Model, DataTypes } = Sequelize
class Ad extends Model {}
Ad.init(
  {
    gender: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    bodyPart: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    isGiven: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    photoName: {
      type: DataTypes.STRING
    }
  },
  { sequelize, modelName: 'Ad' }
)

export default Ad

// TODOs
// * think about matching the 3 (2 layers maybe because of sequelize)
// layers' with enums.
