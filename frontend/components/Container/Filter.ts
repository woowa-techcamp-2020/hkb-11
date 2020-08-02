import { Container } from '.'
import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT } from '../../utils/constants'
import FilterView from '../../view/ContainerView/RouterView/FilterView'

export class Filter extends Component<FilterView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: FilterView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel

    this.invoiceModel.on(EVENT.SET_SUM_EARNING, (amount) => {
      this.view.setEarningTotal(amount)
    })
    this.invoiceModel.on(EVENT.SET_SUM_SPENDING, (amount) => {
      this.view.setSpendingTotal(amount)
    })
    this.view.bindEarningToggleHandler((value) => {
      this.invoiceModel.setEarningToggle(value)
    })
    this.view.bindSpendingToggleHandler((value) => {
      this.invoiceModel.setSpendingToggle(value)
    })
  }
}
