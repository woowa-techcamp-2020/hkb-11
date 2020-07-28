import express from 'express'

import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import router from './routes/index'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '../frontend/dist')))

app.use('/api', router)

module.exports = app
