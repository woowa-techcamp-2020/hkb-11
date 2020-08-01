import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import RouterView from '../../view/ContainerView/RouterView'
import FilterView from '../../view/ContainerView/RouterView/FilterView'
import FormVIew from '../../view/ContainerView/RouterView/FormView'
import ListView from '../../view/ContainerView/RouterView/ListView'
import mockup from '../mockup'
import { Filter } from './Filter'
import { Form } from './Form'
import { List } from './List'

export class Container extends Component<RouterView> {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  invoiceModel: InvoiceModel
  list: List
  filter: Filter
  form: Form

  constructor(view: RouterView) {
    super(null, view)

    this.invoiceModel = new InvoiceModel()

    // generate views by route
    const route = ''
    if (route === '') {
      this.generateList()
    } else if (route === 'calendar') {
      this.generateCalendar()
    } else if (route === 'chart') {
      this.generateChart()
    }

    this.invoiceModel.setInvoices(mockup)
  }

  generateList() {
    this.listView = this.view.listView
    this.list = new List(this, this.listView)

    this.filterView = this.view.filterView
    this.filter = new Filter(this, this.filterView)

    this.formView = this.view.formView
    this.form = new Form(this, this.formView)
  }

  generateCalendar() {}

  generateChart() {}
}
