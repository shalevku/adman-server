import { UserC } from '../controllers/index.js'
import express from 'express'
import { uploadToServer } from '../config/fileManagement.config.js'

const router = express.Router()

//    CR on collection
router.route('/')
  // Create
  .post(uploadToServer.none(), UserC.create)
  // Read all
  .get(UserC.readAll)

// RUD on one
router.route('/:id')
  // Read
  .get(UserC.read)
  // Update
  .put(uploadToServer.none(), UserC.update)
  // Destroy
  .delete(UserC.destroy)

export default router

// TODOs
// Maybe
// * let user to upload a photo.