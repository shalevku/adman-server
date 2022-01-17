import { AdPhotoC } from '../controllers/index.js'
import express from 'express'

const router = express.Router()

//    C on collection
router
  .route('/')
  // Create (sending a signed URL for the client to put the photo into)
  .post(AdPhotoC.create) // aws uses put instead of post.

//    UD on one
router
  .route('/:key')
  // Destroy
  .delete(AdPhotoC.destroy)

export default router
