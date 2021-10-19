import { User } from '../models/index.js'
import process from 'process'
import fs from 'fs/promises'
import path from 'path'

const controller = {}

//    CR on collection
// Create a new element
controller.create = (req, res) => {
  const user = req.body
  // Save User in the database
  User.create(user)
    .then(user => {
      // Create a photos directory named user id (email can change!) for the user.
      const userPhotoPath = path.join(
        process.cwd(),
        'public',
        'photos',
        user.id.toString(),
        '.keep' // Because github doesn't store empty folders.
      )
      fs.access(userPhotoPath).catch(() => {
        fs.mkdir(path.dirname(userPhotoPath)).then(() => {
          fs.open(userPhotoPath, 'w').then(() => {
            res.status(201).send(user) // Respond 201 Created.
          })
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}
// Read all
controller.readAll = (req, res) => {
  User.findAll()
    .then(users => {
      // Respond all records after trim (and 200 OK - The resource(s) has been fetched).
      res.send(
        users.map(user => {
          // iterate all fields to trim them.
          Object.keys(user).forEach(key => {
            if (typeof user[key] === 'string') user[key] = user[key].trim()
          })
          return user
        })
      )
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}

//    RUD on a single element
// Read
controller.read = (req, res) => {
  const id = req.params.id
  User.findByPk(id)
    .then(user => {
      // iterate all fields to trim them.
      Object.keys(user).forEach(key => {
        if (typeof user[key] === 'string') user[key] = user[key].trim()
      })
      res.send(user)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}
// Update
controller.update = (req, res) => {
  const id = req.params.id

  User.update(req.body, {
    where: { id: id }
  })
    .then(results => {
      if (results.length === 1) {
        res.sendStatus(204) // 204 No Content
      } else {
        res.sendStatus(400) // 400 Bad Request
      }
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500) // 500 Internal Server Error
    })
}
// Destroy
controller.destroy = (req, res) => {
  const id = req.params.id
  // Delete his photos folder
  const destroyFolderPromise = fs.rm(
    path.join(process.cwd(), 'public', 'photos', id.toString()),
    { recursive: true }
  )
  // Destroy the user (and cascading to delete his ads ).
  const destroyUserPromise = User.destroy({
    where: { id: id }
  })

  Promise.all([destroyFolderPromise, destroyUserPromise])
    .then(([isRmFailed, num]) => {
      if (!isRmFailed && num === 1) {
        res.sendStatus(204) // 204 No Content
      } else {
        res.sendStatus(400) // 400 Bad Request
      }
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500) // 500 Internal Server Error
    })
}

export default controller

// TODOs
// * check how to do an async middleware (apparantly it can be done easily by some site)
