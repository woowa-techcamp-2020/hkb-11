import { Container } from '.'
import { Component } from '..'
import { Invoice } from '../../../types'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT } from '../../utils/constants'
import ChartView from '../../view/ContainerView/RouterView/ChartView'

export class Chart extends Component<ChartView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: ChartView) {
    super(parent, view)
    this.invoiceModel = this.parent.invoiceModel
  }
  aggregateByDate(invoices: Invoice[]) {
    return invoices
      .filter((x) => x.category.type === '지출')
      .reduce((prev, { amount, date }) => {
        const _date = date.getDate()
        const beforeAmount = _date in prev ? prev[_date] : 0
        return { ...prev, [_date]: amount + beforeAmount }
      }, {})
  }
  aggregateByCategory(invoices: Invoice[]) {
    return invoices
      .filter((x) => x.category.type === '지출')
      .reduce((prev, { amount, date, category }) => {
        const _category = category.title
        const beforeAmount = category.title in prev ? prev[category.title] : 0
        return { ...prev, [category.title]: amount + beforeAmount }
      }, {})
  }
  bind() {
    this.invoiceModel.on(EVENT.SET_INVOICES, (invoices: Invoice[]) => {
      const result = this.aggregateByDate(invoices)
      console.log(result)
      const result2 = this.aggregateByCategory(invoices)
      console.log(result2)
    })
  }
  unbind() {
    this.invoiceModel.off(EVENT.SET_INVOICES)
  }
}
