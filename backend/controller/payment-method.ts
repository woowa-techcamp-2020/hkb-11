import { Request, Response } from 'express'
import { OkPacket } from 'mysql2'
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

const postPaymentMethod = async (req: Request, res: Response) => {
  try {
    // jwt token 검사
    const userId = 'agrajak2' //temp userId
    const {
      paymentMethod: { title },
    } = req.body

    const [row] = await pool.query<OkPacket>(query.INSERT_PAYMENT_METHOD, [
      title,
      userId,
    ])

    res.json({
      paymentMethodId: row.insertId,
    })
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

export default {
  getPaymentMethodList,
  postPaymentMethod,
}
