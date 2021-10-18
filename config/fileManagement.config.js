import { Ad } from '../models/index.js'
import path from 'path'
import * as fs from 'fs/promises'

//    File management.
import multer from 'multer'
// Multer storage
const storage = multer.diskStorage({
  // Folder name resolution.
  destination: (req, file, cb) => {
    // Upload the photo to his directory (created for him when he created the account).
    cb(
      null,
      path.join(
        process.cwd(),
        'public',
        'photos',
        req.session.user.id.toString()
      )
    )
  },
  // Filname resolution.
  filename: (req, file, cb) => {
    const ad = req.body
    if (ad.id && file) {
      // update and has photo file
      Ad.findByPk(ad.id)
        .then(ad => {
          ad.photoName = ad.photoName.trim()
          return fs.unlink(
            path.join(
              process.cwd(),
              'public',
              'photos',
              req.session.user.id.toString(),
              ad.photoName
            )
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
    // We add current time to the photo name so that the browser won't take them from its cache.
    const now = new Date().toISOString().replace(/[-:]/g, '')
    // TODO: try with ad as reference to req.body
    req.body.photoName = `${now}-${file.originalname}` // User extension included.
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
      if (ad.photoName) {
        // photo exists
        ad.photoName = ad.photoName.trim()
        return fs.unlink(
          path.join(
            process.cwd(),
            'public',
            'photos',
            req.session.user.id.toString(),
            ad.photoName
          )
        )
      }
    })
    .catch(err => {
      console.log(err)
    })
  next()
}

export { upload, destroySingle }
