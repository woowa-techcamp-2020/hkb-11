import express, { Request, Response } from 'express'
import { OkPacket } from 'mysql2'
import pool from '../pool'
import query from '../query'
const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { invoice } = req.body
    const { date, categoryId, paymentMethodId, item, amount } = invoice
    const [row] = await pool.query<OkPacket>(query.INSERT_INVOICE, [
      date,
      categoryId,
      paymentMethodId,
      item,
      amount,
    ])
    res.json({
      invoiceId: row.insertId,
    })
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
})

export default router
