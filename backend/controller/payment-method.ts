import { Request, Response } from 'express'
import pool from '../pool'
import query from '../query'

const getPaymentMethodList = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(query.SELECT_PAYMENT_METHOD_LIST)
    res.json({
      paymentMethodList: rows,
    })
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

export default {
  getPaymentMethodList,
}
