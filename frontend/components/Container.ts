import { Component } from '.'
import { InvoiceModel } from '../model/InvoiceModel'
import { EVENTS } from '../utils/constants'
import RouterView from '../view/ContainerView/RouterView'
import FilterView from '../view/ContainerView/RouterView/FilterView'
import FormVIew from '../view/ContainerView/RouterView/FormView'
import ListView from '../view/ContainerView/RouterView/ListView'
import mockup from './mockup'
export class Container extends Component<RouterView> {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  invoiceModel: InvoiceModel
  constructor(view: RouterView) {
    super(null, view)
    this.formView = view.formView
    this.filterView = view.filterView
    this.listView = view.listView
    this.invoiceModel = new InvoiceModel()
    this.invoiceModel.on(EVENTS.ADD_INVOICE, (invoice) => {
      this.listView.addInvoice(invoice)
    })
    this.invoiceModel.on(EVENTS.SET_SUM_EARNING, (amount) => {
      this.filterView.setEarningTotal(amount)
    })
    this.invoiceModel.on(EVENTS.SET_SUM_SPENDING, (amount) => {
      this.filterView.setSpendingTotal(amount)
    })
    this.formView.bindInvoiceAddHandler(() => {
      this.invoiceModel.addInvoice(mockup[0])
    })
    this.invoiceModel.setInvoices(mockup)
  }
}
