import { Container } from '.'
import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import ChartView from '../../view/ContainerView/RouterView/ChartView'

export class Chart extends Component<ChartView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: ChartView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel
  }
}
