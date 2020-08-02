import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENTS } from '../../utils/constants'
import ListView from '../../view/ContainerView/RouterView/ListView'
import { Container } from './index'

export class List extends Component<ListView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: ListView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.view.bindInvoiceEditHandler((id) => {
      // TODO: Communcate with API
      this.invoiceModel.removeInvoice(id)
    })
    this.view.bindInvoiceClickledHandler((id) => {
      this.invoiceModel.highlight(id)
    })
  }
  bind() {
    this.invoiceModel.on(EVENTS.ADD_INVOICE, ({ invoice, hidden }) => {
      this.view.addInvoice(invoice, hidden)
    })
    this.invoiceModel.on(EVENTS.REMOVE_INVOICE, (id) => {
      this.view.removeInvoice(id)
    })
    this.invoiceModel.on(EVENTS.CLEAR_INVOICES, () => {
      this.view.clear()
    })
    this.invoiceModel.on(EVENTS.HIGHLIGHT_INVOICE, ({ id, flag }) => {
      this.view.highlightInvoice(id, flag)
    })

    this.invoiceModel.on(EVENTS.EARNING_TOGGLE, (value) => {
      this.view.setEarningVisible(value)
    })
    this.invoiceModel.on(EVENTS.SPENDING_TOGGLE, (value) => {
      this.view.setSpendingVisible(value)
    })
  }
  unbind() {
    this.invoiceModel.off(EVENTS.ADD_INVOICE)
    this.invoiceModel.off(EVENTS.REMOVE_INVOICE)
    this.invoiceModel.off(EVENTS.HIGHLIGHT_INVOICE)
    this.invoiceModel.off(EVENTS.EARNING_TOGGLE)
    this.invoiceModel.off(EVENTS.SPENDING_TOGGLE)
  }
}
