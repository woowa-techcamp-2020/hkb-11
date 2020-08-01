import { Container } from '.'
import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENTS } from '../../utils/constants'
import FilterView from '../../view/ContainerView/RouterView/FilterView'

export class Filter extends Component<FilterView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: FilterView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.invoiceModel.on(EVENTS.SET_SUM_EARNING, (amount) => {
      this.view.setEarningTotal(amount)
    })
    this.invoiceModel.on(EVENTS.SET_SUM_SPENDING, (amount) => {
      this.view.setSpendingTotal(amount)
    })
  }
}
