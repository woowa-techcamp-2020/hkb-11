import express, { NextFunction, Request, Response } from 'express'
import passport from 'passport'
const router = express.Router()

/* GET home page. */

router.get('/login', (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    const { id, refreshToken, accessToken } = user
    console.log('logined!', user)
    return res.redirect(`/`)
  })(req, res, next)
})

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
  }),
  (req: Request, res: Response, next: NextFunction) => {
    res.redirect('/')
  }
)

export default router
