import { Request, Response } from 'express'
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
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

const postInvoice = async (req: Request, res: Response) => {
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
}

const putInvoice = async (req: Request, res: Response) => {
  try {
    const { invoice } = req.body
    const { id, date, categoryId, paymentMethodId, item, amount } = invoice

    // 수정할 Invoice가 있는지 검사, false: 404
    const [row] = await pool.query<RowDataPacket[]>(query.SELECT_INVOICE, [id])
    if (row.length === 0) {
      res.status(404).json()
      return
    }

    const [result] = await pool.query<ResultSetHeader>(query.UPDATE_INVOICE, [
      date,
      categoryId,
      paymentMethodId,
      item,
      amount,
      id,
    ])

    // 변경된 사항이 없다면(수정된 것이 없다면) Error를 발생시켜 500 리턴
    if (result.affectedRows === 0) {
      throw Error('no change')
    }

    res.status(200).json()
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

const deleteInvoice = async (req: Request, res: Response) => {
  try {
    // jwt token 검사, false: 401

    const {
      invoice: { id },
    } = req.body

    // 삭제할 Invoice가 있는지 검사, false: 404
    const [row] = await pool.query<RowDataPacket[]>(query.SELECT_INVOICE, [id])
    if (row.length === 0) {
      res.status(404).json()
      return
    }

    const [result] = await pool.query<ResultSetHeader>(
      query.DELETE_INVOICE_METHOD,
      [id]
    )

    // 변경된 사항이 없다면(삭제된 것이 없다면) Error를 발생시켜 500 리턴
    if (result.affectedRows === 0) {
      throw Error('no change')
    }

    res.status(200).json()
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

export default {
  getInvoiceList,
  postInvoice,
  putInvoice,
  deleteInvoice,
}
