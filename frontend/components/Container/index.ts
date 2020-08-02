import { Component } from '..'
import { InvoiceModel } from '../../model/InvoiceModel'
import { EVENT } from '../../utils/constants'
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

    // TEMP : generate views by route
    const route = ''
    if (route === '') {
      this.generateList()
    } else if (route === 'calendar') {
      this.generateCalendar()
    } else if (route === 'chart') {
      this.generateChart()
    }

    this.invoiceModel.setInvoices(mockup)

    this.invoiceModel.on(EVENT.EARNING_TOGGLE, (value) => {
      this.listView.setEarningToggle(value)
    })
    this.invoiceModel.on(EVENT.SPENDING_TOGGLE, (value) => {
      this.listView.setSpendingToggle(value)
    })
  }

  generateList() {
    this.listView = this.view.listView
    this.list = new List(this, this.listView)

    this.filterView = this.view.filterView
    this.filter = new Filter(this, this.filterView)

    this.formView = this.view.formView
    this.form = new Form(this, this.formView)
  }

  generateCalendar() {
    this.calendarView = this.view.calendarView
    this.calendar = new Calendar(this, this.calendarView)
  }

  generateChart() {
    this.chartView = this.view.chartView
    this.chart = new Chart(this, this.chartView)
  }
}
