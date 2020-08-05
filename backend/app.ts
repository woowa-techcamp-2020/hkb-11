import cookieParser from 'cookie-parser'
import express, { NextFunction, Request, Response } from 'express'
import bearerToken from 'express-bearer-token'
import logger from 'morgan'
import path from 'path'
import router from './routes/index'
const app = express()

declare global {
  namespace Express {
    export interface Request {
      auth?: boolean
    }
  }
}
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../frontend/dist')))
app.use(bearerToken())
app.use((req: Request, res: Response, next: NextFunction) => {
  req.auth = false
  if (req.token) {
    const obj = JSON.parse(req.token)
    if ('id' in obj) {
      req.auth = true
    }
  }
  next()
})
app.use('/api', router)
console.log('hi22ddddddasaaadddddddd')
module.exports = app
