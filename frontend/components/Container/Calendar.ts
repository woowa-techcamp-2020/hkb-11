import { Container } from '.'
import { Component } from '..'
import { Invoice } from '../../../types'
import { InvoiceModel } from '../../model/InvoiceModel'
import router from '../../router'
import { CONSTANT, EVENT } from '../../utils/constants'
import CalendarView from '../../view/ContainerView/RouterView/CalendarView'

function formatAmountObj(dateAmountObj) {
  for (let key in dateAmountObj) {
    dateAmountObj[key] = dateAmountObj[key]
      .toString()
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return dateAmountObj
}

export class Calendar extends Component<CalendarView, Container> {
  invoiceModel: InvoiceModel

  constructor(parent, view: CalendarView) {
    super(parent, view)

    this.invoiceModel = this.parent.invoiceModel
  }

  bind() {
    this.invoiceModel.on(EVENT.SET_INVOICES, (invoices) => {
      this.view.clear()

      this.view.setDateCells(router.getYear(), router.getMonth())
      const [dateEarningObj, dateSpendingObj] = this.formatDateSum(invoices)
      this.view.setDateEarning(dateEarningObj)
      this.view.setDateSpending(dateSpendingObj)
    })

    this.invoiceModel.on(EVENT.EARNING_TOGGLE, (isClicked: boolean) => {
      this.view.setEarningVisible(isClicked)
    })

    this.invoiceModel.on(EVENT.SPENDING_TOGGLE, (isClicked: boolean) => {
      this.view.setSpendingVisible(isClicked)
    })
  }

  unbind() {
    this.invoiceModel.off(EVENT.SET_INVOICES)
    this.invoiceModel.off(EVENT.EARNING_TOGGLE)
    this.invoiceModel.off(EVENT.SPENDING_TOGGLE)
  }

  formatDateSum(invoices: Invoice[]) {
    const [dateEarningObj, dateSpendingObj] = invoices.reduce(
      ([dateEarningObj, dateSpendingObj], invoice: Invoice) => {
        const date = invoice.date.getDate()

        if (invoice.category.type === CONSTANT.EARNING) {
          if (!dateEarningObj[date]) dateEarningObj[date] = 0
          dateEarningObj[date] += invoice.amount
        } else {
          if (!dateSpendingObj[date]) dateSpendingObj[date] = 0
          dateSpendingObj[date] += invoice.amount
        }

        return [dateEarningObj, dateSpendingObj]
      },
      [{}, {}]
    )
    return [formatAmountObj(dateEarningObj), formatAmountObj(dateSpendingObj)]
  }
}
