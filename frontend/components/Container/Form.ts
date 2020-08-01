import { Container } from '.'
import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import FormView from '../../view/ContainerView/RouterView/FormView'
import mockup from '../mockup'

export class Form extends Component<FormView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: FormView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.view.bindInvoiceAddHandler(() => {
      this.invoiceModel.addInvoice(mockup[0])
    })
  }
}
