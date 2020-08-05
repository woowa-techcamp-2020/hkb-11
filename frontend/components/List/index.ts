import { Invoice } from '../../../types'
import { CategoryModel } from '../../model/CategoryModel'
import { InvoiceModel } from '../../model/InvoiceModel'
import { PaymentModel } from '../../model/PaymentModel'
import { EVENT } from '../../utils/constants'
import { Component } from '../component'
import { Container } from '../Container/index'
import ListView from './view'

export class List extends Component<ListView, Container> {
  invoiceModel: InvoiceModel
  categoryModel: CategoryModel
  paymentModel: PaymentModel

  constructor(parent, view: ListView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel
    this.categoryModel = this.parent.categoryModel
    this.paymentModel = this.parent.paymentModel

    this.view.bindInvoiceEditHandler((id) => {
      // TODO: Communcate with API
      // this.invoiceModel.removeInvoice(id)
    })
    this.view.bindInvoiceClickledHandler((id) => {
      this.invoiceModel.highlight(id)
    })
  }
  bind() {
    this.invoiceModel.on(EVENT.ADD_INVOICE, ({ invoice, hidden }) => {
      this.view.addInvoice(invoice, hidden)
    })
    this.invoiceModel.on(EVENT.SET_INVOICES, (invoices) => {
      this.view.clear()
      invoices.forEach((invoice: Invoice) => {
        this.view.addInvoice(invoice, false)
      })
    })
    this.invoiceModel.on(EVENT.REMOVE_INVOICE, (id) => {
      this.view.removeInvoice(id)
    })
    this.invoiceModel.on(EVENT.CLEAR_INVOICES, () => {
      this.view.clear()
    })
    this.invoiceModel.on(EVENT.HIGHLIGHT_INVOICE, ({ id, flag }) => {
      this.view.highlightInvoice(id, flag)
    })

    this.invoiceModel.on(EVENT.EARNING_TOGGLE, (value) => {
      this.view.setEarningVisible(value)
    })
    this.invoiceModel.on(EVENT.SPENDING_TOGGLE, (value) => {
      this.view.setSpendingVisible(value)
    })
  }
  unbind() {
    this.invoiceModel.off(EVENT.ADD_INVOICE)
    this.invoiceModel.off(EVENT.SET_INVOICES)
    this.invoiceModel.off(EVENT.CLEAR_INVOICES)
    this.invoiceModel.off(EVENT.REMOVE_INVOICE)
    this.invoiceModel.off(EVENT.HIGHLIGHT_INVOICE)
    this.invoiceModel.off(EVENT.EARNING_TOGGLE)
    this.invoiceModel.off(EVENT.SPENDING_TOGGLE)
  }
}
