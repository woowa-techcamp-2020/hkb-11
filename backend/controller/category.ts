import { Request, Response } from 'express'
import model from '../models'

const getCategoryList = async (req: Request, res: Response) => {
  try {
    const data = await model.selectCategoryList()
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
  getCategoryList,
}
