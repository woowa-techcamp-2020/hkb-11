import express from 'express'
import controller from '../controller'
import invoiceRouter from './invoice'
import paymentMethodRouter from './payment-method'
const router = express.Router()

/* GET home page. */
router.use('/login', controller.login)
router.post('/signup', controller.signup)
router.use('/invoice', invoiceRouter)

/* Category API */
router.get('/category', controller.getCategoryList)
router.use('/payment_method', paymentMethodRouter)

export default router
