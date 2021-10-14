import { Ad } from '../models/index.js'
import Sequelize from 'sequelize'
const controller = {}

//    CR on collection
// Create
controller.create = (req, res) => {
  const newAd = req.body // with photoName
  newAd.UserId = req.session.user.id
  // Add
  Ad.create(newAd)
    .then(ad => {
      // With new id.
      res.status(201).send(ad) // Respond 201 Created.
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}
// Read all
controller.readAll = (req, res) => {
  Ad.findAll()
    .then(ads => {
      // Respond all records after trim (and 200 OK - The resource(s) has been fetched).
      res.send(
        ads.map(ad => {
          // iterate all fields to trim them.
          Object.keys(ad).forEach(key => {
            if (typeof ad[key] === 'string') ad[key] = ad[key].trim()
          })
          return ad
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
  Ad.findByPk(id)
    .then(ad => {
      // iterate all fields to trim them.
      Object.keys(ad).forEach(key => {
        if (typeof ad[key] === 'string') ad[key] = ad[key].trim()
      })
      res.send(ad)
    })
    .catch(err => {
      res.sendStatus(500)
    })
}
// Update
controller.update = (req, res) => {
  const id = req.params.id
  const ad = req.body
 console.log(id)
 console.log(ad)
  Ad.update(ad, {
    where: { id: id }
  })
    .then(results => {
      if (results.length === 1) {
        res.sendStatus(204) // Respond 204 No Content.
      } else {
        res.sendStatus(400) // 400 Bad Request. Maybe Ad was not found
      }
    })
    .catch(err => {
      console.log(err)
      res.statusStatus(500)
    })
}
// Destroy
controller.destroy = (req, res) => {
  const id = req.params.id

  Ad.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.sendStatus(204) // Respond 204 No Content.
      } else {
        res.sendStatus(400) // 400 Bad Request. Maybe Ad was not found
      }
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
}

export default controller
