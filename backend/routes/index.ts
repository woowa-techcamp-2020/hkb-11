import express from 'express'
import controller from '../controller'
import categoryRouter from './category'
import invoiceRouter from './invoice'
const router = express.Router()

/* GET home page. */
router.use('/login', controller.login)
router.post('/signup', controller.signup)
router.use('/invoice', invoiceRouter)
router.use('/category', categoryRouter)

export default router
