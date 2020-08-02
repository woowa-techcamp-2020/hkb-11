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

    this.view.bindEarningToggleHandler((value) => {
      this.invoiceModel.setEarningToggle(value)
    })
    this.view.bindSpendingToggleHandler((value) => {
      this.invoiceModel.setSpendingToggle(value)
    })
    this.bind()
  }
  bind() {
    this.invoiceModel.on(EVENTS.SET_SUM_EARNING, (amount) => {
      this.view.setEarningTotal(amount)
    })
    this.invoiceModel.on(EVENTS.SET_SUM_SPENDING, (amount) => {
      this.view.setSpendingTotal(amount)
    })
  }
  unbind() {
    this.invoiceModel.off(EVENTS.SET_SUM_EARNING)
    this.invoiceModel.off(EVENTS.SET_SUM_SPENDING)
  }
}
