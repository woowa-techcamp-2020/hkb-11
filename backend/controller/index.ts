import { NextFunction, Request, Response } from 'express'
import { OkPacket } from 'mysql2'
import passport from 'passport'
import categoryController from '../controller/category'
import invoiceController from '../controller/invoice'
import paymentMethodController from '../controller/payment-method'
import pool from '../pool'
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
async function signup(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const { id, password } = req.body
  const [row] = await pool.query<OkPacket>(
    'INSERT INTO Users (id, password) VALUES (?, ?)',
    [id, password]
  )
  // TODO: 토큰 만들기
  const token = ''
  res.status(200).json({
    token,
  })
}
const Controller = {
  login,
  signup,
  ...categoryController,
  ...paymentMethodController,
  ...invoiceController,
}
export default Controller
