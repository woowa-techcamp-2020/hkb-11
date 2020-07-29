import { Request, Response } from 'express'
import model from '../models'

const getPaymentMethodList = async (req: Request, res: Response) => {
  try {
    const data = await model.selectPaymentMethodList()
    res.json({
      paymentMethodList: data,
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
