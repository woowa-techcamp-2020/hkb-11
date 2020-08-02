import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT } from '../../utils/constants'
import ListView from '../../view/ContainerView/RouterView/ListView'
import { Container } from './index'

export class List extends Component<ListView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: ListView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.invoiceModel.on(EVENT.ADD_INVOICE, (invoice) => {
      this.view.addInvoice(invoice)
    })
    this.invoiceModel.on(EVENT.REMOVE_INVOICE, (id) => {
      this.view.removeInvoice(id)
    })
    this.invoiceModel.on(EVENT.HIGHLIGHT_INVOICE, ({ id, flag }) => {
      this.view.highlightInvoice(id, flag)
    })

    this.view.bindInvoiceEditHandler((id) => {
      // TODO: Communcate with API
      // this.invoiceModel.removeInvoice(id)
    })
    this.view.bindInvoiceClickledHandler((id) => {
      this.invoiceModel.highlight(id)
    })
  }
}
