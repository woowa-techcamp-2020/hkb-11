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
  }
}
