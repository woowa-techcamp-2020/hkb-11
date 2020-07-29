import express from 'express'
import controller from '../controller/category'
const router = express.Router()

router.get('/', controller.getCategories)

export default router
