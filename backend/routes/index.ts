import express from 'express'
import controller from '../controller'
const router = express.Router()

/* GET home page. */
router.use('/login', controller.login)
router.post('/signup', controller.signup)

/* Category API */
router.get('/category', controller.getCategoryList)

/* PaymentMethod API */
router
  .route('/payment_method')
  .get(controller.getPaymentMethodList)
  .post(controller.postPaymentMethod)
  .delete(controller.deletePaymentMethod)

/* Invoice API */
router
  .route('/invoice')
  .get(controller.getInvoiceList)
  .post(controller.postInvoice)
  .put(controller.getInvoiceList)
  .delete(controller.deleteInvoice)

export default router
