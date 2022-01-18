// AWS S3
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const BUCKET_NAME = 'adman-preview'
const REGION = 'us-east-2'
const s3Client = new S3Client({ region: REGION })
console.log('aws creds:')
console.log(process.env.aws_access_key_id)
console.log(process.env.aws_secret_access_key)
const controller = {}

//    C on collection (of files)
// Create
controller.create = async (req, res) => {
  const secondsSinceEphoch = Math.floor(Date.now() / 1000)
  const key = req.session.user.id + '-' + secondsSinceEphoch + '-' + req.body.params['file-name']
  const putObjectCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: req.body.params['file-type'],
    ACL: 'public-read'
  })

  try {
    const signedURL = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3600
    })
    const resBody = {
      signedURL,
      photo: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`
    }
    res.json(resBody)
  } catch (error) {
    console.log('Error creating presigned URL', error)
    res.sendStatus(500)
  }
}

//    D on single (file)
// Destroy
controller.destroy = async (req, res) => {
  // Destroy photo by key.
  const key = req.params.key
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key
  })

  try {
    await s3Client.send(deleteObjectCommand)
    res.sendStatus(204)
  } catch (error) {
    console.log('Error destroying photo ', error)
    res.sendStatus(500)
  }
}

export default controller
