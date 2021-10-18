//    Imports
import express from 'express'
import logger from 'morgan'
import path from 'path'
import { userSession } from './config/session.config.js' // TODO: Don't use the default session store.
//    Globals and local imports
const app = express()
const PUBLIC_ROUTES = {
  GET: ['/public', '/ads', '/'],
  POST: ['/users', 'userSession']
}

//    Standard routes
// log server activities, create userSession and serve static assets (photos).
app.use(logger('dev'), userSession, express.static('./public'), express.static(path.join(process.cwd(), 'build')))
// Make sure user has permission for the requested route.
app.use((req, res, next) => {
  // It is a guest.
  if (!req.session.user) {
    // Guest tried to access a private route.
    if (!PUBLIC_ROUTES[req.method]) {
      res.sendStatus(401) // 401 Unauthorized
      return
    } else if (
      !PUBLIC_ROUTES[req.method].some(publicPath =>
        // Partial match for the path requested.
        req.path.includes(publicPath)
      )
    ) {
      res.sendStatus(401) // 401 Unauthorized
      return
    }
    // TODO: maybe try the above with a regular expression.
  }
  next()
})

//    Method routes
// Sub routes.
import { UserR, UserSessionR, AdR } from './routers/index.js'
app.use('/api/users', UserR)
app.use('/api/userSession', UserSessionR)
app.use('/api/ads', AdR)
// API only related (not related to the client side).
app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'))
})
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome the ad api' })
})

// set port, listen for requests
const PORT = process.env.PORT || 3080
app.listen(PORT)

//      Global remarks
// * Indentation in comments means headings at different levels.
// * C - controller, R - router

// TODOs:
// * Extract name to person table, and change relevant code.
// * the session doesn't work, I need to relogin on navigation to the authentication page.
// extract the max_id from multer, because other tables might need this also.
// TODOs Maybe:
// * send the object template to the client.
// app.get('/tryurl', (req, res) => {
//     // console.log(`req.query: ${ req.query.toString() }.req.body: ${ req.body.toString() }.`)
//     console.log(req.query); console.log(req.body)
//     res.send(`req.query: ${ req.query.toString() }.req.body: ${ req.body.toString() }.`)
// })
// send the actual file on login instead of a redirect.
// * split to multiple tables in the database table and change the queries accordingly.
// * Read about session-store, I need to change the store and pay attention to the secret rules.
// * Check if I need validation in the controller (because view and model already have validation).
//    Maybe
// * Maybe monitor the id index in a global variable and update it with every add.
// * is there a reason to do that really?
// * separate the users and authentication resources, because semantically users have other uses like delete and patch and else...
// and authentication has a store of its own (with maybe cookie as the resource?).
// * In line 19 (Log server requests) are Date object just being created all the time and stay? should I create a variable and replace its value instead?
// * try HTTP response status code 205 for resetting the user view (instead of get) or just sending the records again
// * Maybe add this to the read (all records) route and
// find out how to apply order to the columns (properties) here or on the client side
// // Define the response body with ad fields and ads list (if exist).
// let resbody = new Object()
// resbody.adFields = Object.keys(result.recordset.columns)
// // not empty recordset
// if (result.recordset.length != 0)
//     resbody.ads = result.recordset
// res.send(resbody)  // recordset returned (status: 200 OK)
// * instead of redirect, tell the user that he is unauthorized to access the page and
// start a countdown to redirect to login page (and inform him that a redirect is about to occur)
// * Change sql statement to only check and not retrieve user record.
// * think how to send the user the 404 not found if the resource isn't found and if found check if
// the user is authorized to see it.
// * remove duplicates and do a more elegant solution for registration that invokes an internal login function
// to which the regular login will also call.
// * Use storage string and create folder by neccesity (but it feels like the function method is better).
// * Gracefully shut down the server.
// resources:
// https://dev.to/jeremiahiro/simple-login-with-node-js-express-and-mysql-1o0c

// Notes:
// I don't want the user to send me the full photoname because then he can maliciously change it to someone else.

// Architecture from https://bezkoder.com/node-js-express-sequelize-mysql/
