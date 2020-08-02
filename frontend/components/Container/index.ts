import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import router from '../../router'
import { ROUTER_EVENT } from '../../utils/constants'
import { View } from '../../view'
import RouterView from '../../view/ContainerView/RouterView'
import CalendarView from '../../view/ContainerView/RouterView/CalendarView'
import ChartView from '../../view/ContainerView/RouterView/ChartView'
import FilterView from '../../view/ContainerView/RouterView/FilterView'
import FormVIew from '../../view/ContainerView/RouterView/FormView'
import ListView from '../../view/ContainerView/RouterView/ListView'
import mockup from '../mockup'
import { Calendar } from './Calendar'
import { Chart } from './Chart'
import { Filter } from './Filter'
import { Form } from './Form'
import { List } from './List'

export class Container extends Component<RouterView> {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  calendarView: CalendarView
  chartView: ChartView
  invoiceModel: InvoiceModel
  list: List
  filter: Filter
  form: Form
  calendar: Calendar
  chart: Chart

  constructor(view: RouterView) {
    super(null, view)

    this.invoiceModel = new InvoiceModel()

    this.listView = this.view.listView
    this.filterView = this.view.filterView
    this.formView = this.view.formView
    this.calendarView = this.view.calendarView
    this.chartView = this.view.chartView
    this.list = new List(this, this.listView)
    this.filter = new Filter(this, this.filterView)
    this.form = new Form(this, this.formView)
    this.calendar = new Calendar(this, this.calendarView)
    this.chart = new Chart(this, this.chartView)

    router.add('list', [this.formView, this.filterView, this.listView])
    router.add('calendar', [this.filterView, this.calendarView])
    router.add('chart', [this.chartView])
    router.on(ROUTER_EVENT.MUTATE_VIEW, ({ path, flag, views }) => {
      if (flag) {
        views.forEach((view: View) => {
          view.appendToView(this.view)
        })
        this.invoiceModel.render()
        return
      }
      views.forEach((view: View) => {
        view.clear()
        view.remove()
      })
    })
    this.invoiceModel.setInvoices(mockup)
  }
}
