//    User session
import session from 'express-session'

const userSession = session({
  secret: 'Aa123456',
  resave: true,
  saveUninitialized: true
})

export { userSession }
