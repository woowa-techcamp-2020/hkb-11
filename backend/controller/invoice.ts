import { Request, Response } from 'express'
import pool from '../pool'
import query from '../query'

const getInvoiceList = async (req: Request, res: Response) => {
  try {
    // jwt token 검사, false: 401

    const { year, month } = req.query

    const [rows] = await pool.query(query.SELECT_INVOICE_LIST, [year, month])
    res.json({
      invoiceList: rows,
    })
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

export default {
  getInvoiceList,
}
