import { UserSessionC } from '../controllers/index.js'
import express from 'express'
import { upload } from '../config/common.config.js'

const router = express.Router()

//    CD on a single element
// Create a new element (login).
router.route('/')
  // create (login)
  .post(upload.none(), UserSessionC.create)
  // Destroy (logout)
  .delete(UserSessionC.destroy)

export default router