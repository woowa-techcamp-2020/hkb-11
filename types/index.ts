type Category = {
  id?: number
  type: string
  title: string
}

type PaymentMethod = {
  id?: number
  userId?: number
  title: string
}

type Invoice = {
  id?: number
  date: Date
  category: Category
  paymentMethod: string
  amount: number
  item: string
  userId?: number
}

export { Category, PaymentMethod, Invoice }
