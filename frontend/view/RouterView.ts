import { View } from './index'
import InvoiceFilterView from './InvoiceFilterView'
import InvoiceFormView from './InvoiceFormView'
import InvoiceListView from './InvoiceListView'

export default class RouterView extends View {
  formView: InvoiceFormView
  filterView: InvoiceFilterView
  listView: InvoiceListView
  constructor() {
    super('router-content', 'div')
  }
  mount() {
    this.formView = new InvoiceFormView()
    this.filterView = new InvoiceFilterView()
    this.listView = new InvoiceListView()
    this.formView.appendToView(this)
    this.filterView.appendToView(this)
    this.listView.appendToView(this)
  }
}
