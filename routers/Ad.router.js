import { AdC } from '../controllers/index.js'
import express from 'express'
import { upload, destroySingle } from '../config/common.config.js'

const router = express.Router()

//    CR on collection
router.route('/')
  // Create
  .post(upload.single('photo'), AdC.create)
  // Read all
  .get(AdC.readAll)

//    RUD on one
router.route('/:id')
  // Read
  .get(AdC.read)
  // Update
  .put(upload.single('photo'), AdC.update)
  // Destroy
  .delete(destroySingle, AdC.destroy)

export default router
