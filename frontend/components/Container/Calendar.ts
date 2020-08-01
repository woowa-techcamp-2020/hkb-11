import { Container } from '.'
import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import CalendarView from '../../view/ContainerView/RouterView/CalendarView'

export class Calendar extends Component<CalendarView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: CalendarView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel
  }
}
