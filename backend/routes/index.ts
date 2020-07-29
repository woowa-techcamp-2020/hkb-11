import express from 'express'
import controller from '../controller'
import invoiceRouter from './invoice'
const router = express.Router()

/* GET home page. */
router.use('/login', controller.login)
router.post('/signup', controller.signup)
router.use('/invoice', invoiceRouter)

/* Category API */
router.get('/category', controller.getCategoryList)

/* PaymentMethod API */
router.get('/payment_method', controller.getPaymentMethodList)
router.post('/payment_method', controller.getPaymentMethodList)
router.delete('/payment_method', controller.getPaymentMethodList)

export default router
