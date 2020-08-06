import { Component } from '..'
import * as API from '../../api'
import { CategoryModel } from '../../model/CategoryModel'
import { InvoiceModel } from '../../model/InvoiceModel'
import { PaymentModel } from '../../model/PaymentModel'
import store from '../../model/store'
import router from '../../router'
import { GLOBAL, ROUTE, ROUTER, ROUTES } from '../../utils/constants'
import { App } from '../app'
import { Calendar } from '../Calendar'
import { Chart } from '../Chart'
import { Filter } from '../Filter'
import { Form } from '../Form'
import { List } from '../List'
import { View } from '../view'
import ContainerView from './view'

export class Container extends Component<ContainerView, App> {
  invoiceModel: InvoiceModel = new InvoiceModel()
  categoryModel: CategoryModel = new CategoryModel()
  paymentModel: PaymentModel
  list: List
  filter: Filter
  form: Form
  calendar: Calendar
  chart: Chart
  routerMap: Map<string, Component<View>> = new Map<string, Component<View>>()

  constructor(parent, view: ContainerView) {
    super(parent, view)

    this.paymentModel = this.parent.paymentModel

    this.list = new List(this, this.view.listView)
    this.filter = new Filter(this, this.view.filterView)
    this.form = new Form(this, this.view.formView)
    this.calendar = new Calendar(this, this.view.calendarView)
    this.chart = new Chart(this, this.view.chartView)

    store.on(GLOBAL.LOGIN, () => {
      API.fetchCategories().then(({ categoryList }) => {
        this.categoryModel.setCategories(categoryList)
      })

      API.fetchPayments().then(({ paymentMethodList }) => {
        this.paymentModel.setPaymentMethods(paymentMethodList)
      })
    })

    this.routerMap[ROUTE.LIST] = [this.form, this.filter, this.list]
    this.routerMap[ROUTE.CALENDAR] = [this.filter, this.calendar]
    this.routerMap[ROUTE.CHART] = [this.chart]

    router.on(ROUTER.CHANGE_DATE, async ({ year, month }) => {
      const { invoiceList } = await API.fetchInvoices(year, month)
      invoiceList.forEach((invoice) => {
        invoice.date = new Date(invoice.date)
        this.categoryModel.fillInvoice(invoice)
        this.paymentModel.fillInvoice(invoice)
      })
      this.invoiceModel.setInvoices(invoiceList)
    })
    router.on(
      ROUTER.MUTATE_VIEW,
      ({ path, flag }: { path: string; flag: boolean }) => {
        if (!ROUTES.CONTAINER.includes(path)) return
        if (router.isInvalidPath(path)) return
        const components = this.routerMap[path]
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
