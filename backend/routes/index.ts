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
router
  .route('/payment_method')
  .get(controller.getPaymentMethodList)
  .post(controller.postPaymentMethod)
  .delete(controller.deletePaymentMethod)

export default router
