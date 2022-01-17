import { User } from '../models/index.js'

const controller = {}

//    CD on a single element
// Create a new element (login).
controller.create = (req, res) => {
  const user = req.body
  // Edge case: Both are empty?
  if (!user.email && !user.password) return res.sendStatus(400) // 400 Bad Request.
  // Validate the email and matching password
  User.findAll({
    where: {
      email: user.email,
      password: user.password
    }
  })
    .then(results => {
      // Edge case: no such user.
      if (results.length === 0) return res.sendStatus(401) // 401 Unauthorized
      // user was found (authenticated).
      const user = results[0]
      // iterate all fields to trim them.
      Object.keys(user).forEach(key => {
        if (typeof user[key] === 'string') user[key] = user[key].trim()
      })
      user.password = 'classified' // to not leave it hanging around.
      // Create user session.
      req.session.user = user
      console.log('Logged-in user: ' + req.session.user.name)
      res.status(201).send(user) // 201 Created
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
}
// Destroy (logout)
controller.destroy = (req, res) => {
  const user = req.session.user
  delete req.session.user
  console.log('Logged-out user: ' + user.name)
  res.sendStatus(200) // 205 Reset Content.
}

export default controller
