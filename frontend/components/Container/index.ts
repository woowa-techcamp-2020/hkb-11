import { Component } from '..'
import * as api from '../../api'
import { CategoryModel } from '../../model/CategoryModel'
import { InvoiceModel } from '../../model/InvoiceModel'
import { PaymentModel } from '../../model/PaymentModel'
import store from '../../model/store'
import router from '../../router'
import { GLOBAL, ROUTER } from '../../utils/constants'
import { App } from '../app'
import { Calendar } from '../Calendar'
import { Chart } from '../Chart'
import { Filter } from '../Filter'
import { Form } from '../Form'
import { List } from '../List'
import ContainerView from './view'

export class Container extends Component<ContainerView, App> {
  invoiceModel: InvoiceModel
  categoryModel: CategoryModel
  paymentModel: PaymentModel
  list: List
  filter: Filter
  form: Form
  calendar: Calendar
  chart: Chart

  constructor(parent, view: ContainerView) {
    super(parent, view)

    this.invoiceModel = new InvoiceModel()
    this.categoryModel = new CategoryModel()
    this.paymentModel = this.parent.paymentModel

    this.list = new List(this, this.view.listView)
    this.filter = new Filter(this, this.view.filterView)
    this.form = new Form(this, this.view.formView)
    this.calendar = new Calendar(this, this.view.calendarView)
    this.chart = new Chart(this, this.view.chartView)

    store.on(GLOBAL.LOGIN, () => {
      api.fetchCategories().then(({ categoryList }) => {
        this.categoryModel.setCategories(categoryList)
      })

      api.fetchPayments().then(({ paymentMethodList }) => {
        this.paymentModel.setPaymentMethods(paymentMethodList)
      })
    })

    router.add('list', [this.form, this.filter, this.list])
    router.add('calendar', [this.filter, this.calendar])
    router.add('chart', [this.chart])
    router.on(ROUTER.CHANGE_DATE, async ({ year, month }) => {
      // TODO: backend invociecs
      const { invoiceList } = await api.fetchInvoices(year, month)
      invoiceList.forEach((invoice) => {
        invoice.date = new Date(invoice.date)
        this.categoryModel.fillInvoice(invoice)
        this.paymentModel.fillInvoice(invoice)
      })
      this.invoiceModel.setInvoices(invoiceList)
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
