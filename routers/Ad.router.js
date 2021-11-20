import { AdC } from '../controllers/index.js'
import express from 'express'
import { uploadToServer, destroySingle, uploadToS3 } from '../config/fileManagement.config.js'

const router = express.Router()

const upload = uploadToServer.single('photo')

//    CR on collection
router.route('/')
  // Create
  .post(upload, AdC.create)
  // Read all
  .get(AdC.readAll)

//    RUD on one
router.route('/:id')
  // Read
  .get(AdC.read)
  // Update
  .put(upload, AdC.update)
  // Destroy
  .delete(destroySingle, AdC.destroy)

export default router
