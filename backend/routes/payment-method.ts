import express from 'express'
import controller from '../controller'
const router = express.Router()

router.get('/', controller.getPaymentMethodList)
router.post('/', controller.getPaymentMethodList)
router.delete('/', controller.getPaymentMethodList)

export default router
