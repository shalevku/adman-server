import { UserSessionC } from '../controllers/index.js'
import express from 'express'

const router = express.Router()

//    CD on a single element
// Create a new element (login).
router
  .route('/')
  // create (login)
  .post(UserSessionC.create)
  // Destroy (logout)
  .delete(UserSessionC.destroy)

export default router
