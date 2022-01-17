import { AdC } from '../controllers/index.js'
import express from 'express'
// import {  uploadToServer, destroySingle } from '../config/fileManagement.config.js'

const router = express.Router()

// const upload = uploadToServer.single('photo')

//    CR on collection
router.route('/')
  // Create
  .post(AdC.create)
  // Read all
  .get(AdC.readAll)

//    RUD on one
router.route('/:id')
  // Read
  .get(AdC.read)
  // Update
  .put(AdC.update)
  // Destroy
  .delete(/* destroySingle, */ AdC.destroy)

export default router
