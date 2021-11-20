import { UserSessionC } from '../controllers/index.js'
import express from 'express'
import { uploadToServer } from '../config/fileManagement.config.js'

const router = express.Router()

//    CD on a single element
// Create a new element (login).
router.route('/')
  // create (login)
  .post(uploadToServer.none(), UserSessionC.create)
  // Destroy (logout)
  .delete(UserSessionC.destroy)

export default router