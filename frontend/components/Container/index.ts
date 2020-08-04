import { Component } from '..'
import { CategoryModel } from '../../model/CategoryModel'
import { InvoiceModel } from '../../model/InvoiceModel'
import { PaymentModel } from '../../model/PaymentModel'
import router from '../../router'
import { ROUTER } from '../../utils/constants'
import { Calendar } from '../Calendar'
import CalendarView from '../Calendar/view'
import { Chart } from '../Chart'
import ChartView from '../Chart/view'
import { Filter } from '../Filter'
import FilterView from '../Filter/view'
import { Form } from '../Form'
import FormVIew from '../Form/view'
import { List } from '../List'
import ListView from '../List/view'
import mockup, { mockupCategory, mockupPayment } from '../mockup'
import RouterView from './view'

export class Container extends Component<RouterView> {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  calendarView: CalendarView
  chartView: ChartView
  invoiceModel: InvoiceModel
  categoryModel: CategoryModel
  paymentModel: PaymentModel
  list: List
  filter: Filter
  form: Form
  calendar: Calendar
  chart: Chart

  constructor(view: RouterView) {
    super(null, view)

    this.invoiceModel = new InvoiceModel()
    this.categoryModel = new CategoryModel()
    this.paymentModel = new PaymentModel()

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

    // TEMP : fetching data
    this.categoryModel.setCategories(mockupCategory)
    this.paymentModel.setPaymentMethods(mockupPayment)

    router.add('list', [this.form, this.filter, this.list])
    router.add('calendar', [this.filter, this.calendar])
    router.add('chart', [this.chart])
    router.on(ROUTER.CHANGE_DATE, ({ year, month }) => {
      // TODO: backend invociecs
      const mockData = month % 2 == 0 ? mockup : []
      this.invoiceModel.setInvoices(mockData)
    })
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
        if (path !== 'list' && path !== 'calendar' && path !== 'chart') return
        if (flag) {
          components.forEach((component) => {
            const view = component.view
            view.appendToView(this.view)
            view.clear()
            component.bind()
          })
          this.invoiceModel.render()
          this.categoryModel.render()
          this.paymentModel.render()
          return
        }
        components.forEach((component) => {
          const view = component.view
          view.remove()
          component.unbind()
        })
      }
    )
  }
}
