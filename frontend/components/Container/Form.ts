import { Container } from '.'
import { Component } from '..'
import { Invoice } from '../../../types'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT } from '../../utils/constants'
import FormView from '../../view/ContainerView/RouterView/FormView'

export class Form extends Component<FormView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: FormView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.view.bindInvoiceAddHandler(() => {
      const invoice: Invoice = this.view.getInvoiceData()
      this.invoiceModel.addInvoice(invoice)

      this.view.clearForm()
    })

    this.invoiceModel.on(EVENT.HIGHLIGHT_INVOICE, ({ id, flag }) => {
      if (flag === false) return

      const invoice: Invoice = this.invoiceModel.getInvoice(id)
      this.view.setInvoiceData(invoice)
    })
  }
}
