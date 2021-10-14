import path from 'path'
import * as fs from 'fs/promises'
import { Ad } from '../models/index.js'

//    File management.
import multer from 'multer'
// Multer storage
const storage = multer.diskStorage({
  // Folder name resolution.
  destination: (req, file, cb) => {
    // Upload the photo to his directory (created for him when he created the account).
    cb(null, path.join(process.cwd(), 'public', 'photos', req.session.user.id.toString()))
  },
  // Filname resolution.
  filename: (req, file, cb) => {
    const ad = req.body
    if (ad.id && file) {  // update and has photo file
      Ad.findByPk(ad.id)
        .then(ad => {
          ad.photoName = ad.photoName.trim()
          return fs.unlink(
            path.join(process.cwd(), 'public', 'photos', req.session.user.id.toString(), ad.photoName)
          )
        })
        .catch(err => { console.log(err) })
    }
    // We add current time to the photo name so that the browser won't take them from its cache.
    const now = new Date().toISOString().replace(/[-:]/g, '')
    // TODO: try with ad as reference to req.body
    req.body.photoName = `${now}-${file.originalname}`  // User extension included.
    cb(null, req.body.photoName)
  }
})
// For single() multer middleware (upload an ad photo).
const upload = multer({ storage: storage })
// Delete a photo in the delete method. 
const destroySingle = (req, res, next) => {
  const id = req.params.id

  // if the user uploaded a photo, delete the old one.
  Ad.findByPk(id)
    .then(ad => {
      if(ad.photoName) {  // photo exists
        ad.photoName = ad.photoName.trim()
        return fs.unlink(
          path.join(process.cwd(), 'public', 'photos', req.session.user.id.toString(), ad.photoName)
        )
      }
    })
    .catch(err => { console.log(err) })
    next()
}

//    User session
import session from 'express-session'
const userSession = session({
  secret: 'Aa123456',
  resave: true,
  saveUninitialized: true
})

//    Models
import Sequelize from 'sequelize'
// Define the sequelize connection to Mysql.
const sequelize = new Sequelize(
  "heznekdb", "root", "Aa123456",
  {
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
  }
)

export {
  upload,
  destroySingle,
  userSession,
  sequelize
}

//    Testing the connection
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