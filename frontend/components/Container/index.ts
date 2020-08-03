import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import router from '../../router'
import { ROUTER } from '../../utils/constants'
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

    router.add('list', [this.form, this.filter, this.list])
    router.add('calendar', [this.filter, this.calendar])
    router.add('chart', [this.chart])
    router.on(
      ROUTER.MUTATE_VIEW,
      ({
        path,
        flag,
        components,
      }: {
        path: string
        flag: boolean
        components: Component<any>[]
      }) => {
        if (flag) {
          components.forEach((component) => {
            const view = component.view
            view.appendToView(this.view)
            view.clear()
            component.bind()
          })
          this.invoiceModel.render()
          return
        }
        components.forEach((component) => {
          const view = component.view
          view.remove()
          component.unbind()
        })
      }
    )
    this.invoiceModel.setInvoices(mockup)
  }
}
