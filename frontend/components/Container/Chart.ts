import { Container } from '.'
import { Component } from '..'
import { Invoice } from '../../../types'
import { InvoiceModel } from '../../model/InvoiceModel'
import { CONSTANT, EVENT } from '../../utils/constants'
import ChartView from '../../view/ContainerView/RouterView/ChartView'

function isSpending(invoice: Invoice) {
  return invoice.category.type === CONSTANT.SPENDING
}
function invoiceReducer(picker) {
  return (prev, invoice: Invoice) => {
    const key = picker(invoice)
    const beforeAmount = key in prev ? prev[key] : 0
    return {
      ...prev,
      [key]: invoice.amount + beforeAmount,
    }
  }
}
function pickDate(invoice: Invoice) {
  return invoice.date.getDate()
}
function pickCategory(invoice: Invoice) {
  return invoice.category.title
}
function sortByValue(obj) {
  return Object.entries(obj).sort(
    (a: [string, number], b: [string, number]) => a[1] - b[1]
  )
}
export class Chart extends Component<ChartView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: ChartView) {
    super(parent, view)
    this.invoiceModel = this.parent.invoiceModel
  }
  aggregateByDate(invoices: Invoice[]) {
    return invoices.filter(isSpending).reduce(invoiceReducer(pickDate), {})
  }
  aggregateByCategory(invoices: Invoice[]) {
    const totalAmount = invoices.reduce((a, b) => a + b.amount, 0)
    return sortByValue(
      invoices.filter(isSpending).reduce(invoiceReducer(pickCategory), {})
    ).map(([key, value]: [string, number]) => ({
      title: key,
      ang: (value / totalAmount) * 360,
      value,
    }))
  }
  bind() {
    this.invoiceModel.on(EVENT.SET_INVOICES, (invoices: Invoice[]) => {
      this.view.renderBarChart(this.aggregateByDate(invoices))
      this.view.renderPiChart(this.aggregateByCategory(invoices))
    })
  }
  unbind() {
    this.invoiceModel.off(EVENT.SET_INVOICES)
  }
}
