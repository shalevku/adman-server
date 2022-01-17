import { UserC } from '../controllers/index.js'
import express from 'express'

const router = express.Router()

//    CR on collection
router.route('/')
  // Create
  .post(UserC.create)
  // Read all
  .get(UserC.readAll)

// RUD on one
router.route('/:id')
  // Read
  .get(UserC.read)
  // Update
  .put(UserC.update)
  // Destroy
  .delete(UserC.destroy)

export default router

// TODOs
// Maybe
// * let user to upload a photo.