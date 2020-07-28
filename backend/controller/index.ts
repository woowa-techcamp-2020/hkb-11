import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import Strategy from '../strategy'

Strategy()
function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', function (err, user, info) {
    const error = err || info
    if (error) {
      return res.status(401).json({ error })
    }
    if (!user) {
      return res.status(404).json({
        message: 'Something went Wrong',
      })
    }
    // jwt를 활용한 토큰 발급
    res.status(200)
  })(req, res, next)
}

const Controller = {
  login,
}
export default Controller
