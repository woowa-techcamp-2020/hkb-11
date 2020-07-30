import { Component } from '.'
import { InvoiceModel } from '../model/InvoiceModel'
import { EVENTS } from '../utils/constants'
import InvoiceFilterView from '../view/InvoiceFilterView'
import InvoiceFormView from '../view/InvoiceFormView'
import InvoiceListView from '../view/InvoiceListView'
import RouterView from '../view/RouterView'
import mockup from './mockup'
export class Container extends Component<RouterView, InvoiceModel> {
  formView: InvoiceFormView
  filterView: InvoiceFilterView
  listView: InvoiceListView
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
    model.setInvoices(mockup)
  }
}
