import { Request, Response } from 'express'
import pool from '../pool'
import query from '../query'

const getCategories = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(query.SELECT_CATEGORIES)
    res.json({
      categoryList: rows,
    })
  } catch (e) {
    res.status(500).json({
      message: e,
    })
  }
}

export default {
  getCategories,
}
