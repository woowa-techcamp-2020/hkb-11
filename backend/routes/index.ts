import express from 'express'
import controller from '../controller'
const router = express.Router()

/* GET home page. */
router.use('/login', controller.login)
export default router
