import { Request, Response } from 'express'
import model from '../models'

const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await model.selectCategories()
    res.json({
      categoryList: data,
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
