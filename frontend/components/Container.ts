import { Component } from '.'
import { InvoiceModel } from '../model/InvoiceModel'
import { EVENTS } from '../utils/constants'
import RouterView from '../view/RouterView'
import FilterView from '../view/RouterView/FilterView'
import FormVIew from '../view/RouterView/FormView'
import ListView from '../view/RouterView/ListView'
import mockup from './mockup'
export class Container extends Component<RouterView, InvoiceModel> {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  constructor(view: RouterView, model: InvoiceModel) {
    super(view, model)
    this.formView = view.formView
    this.filterView = view.filterView
    this.listView = view.listView
    model.on(EVENTS.ADD_INVOICE, (invoice) => {
      this.listView.addInvoice(invoice)
    })
    model.on(EVENTS.SET_SUM_EARNING, (amount) => {
      this.filterView.setEarningTotal(amount)
    })
    model.on(EVENTS.SET_SUM_SPENDING, (amount) => {
      this.filterView.setSpendingTotal(amount)
    })
    this.formView.bindInvoiceAddHandler(() => {
      model.addInvoice(mockup[0])
    })
    model.setInvoices(mockup)
  }
}
