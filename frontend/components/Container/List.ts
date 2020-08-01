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

    this.invoiceModel.on(EVENTS.ADD_INVOICE, (invoice) => {
      this.view.addInvoice(invoice)
    })
    this.invoiceModel.on(EVENTS.REMOVE_INVOICE, (id) => {
      this.view.removeInvoice(id)
    })
    view.bindInvoiceClickedHandler((id) => {
      // TODO: Communcate with API
      this.invoiceModel.removeInvoice(id)
    })
  }
}
