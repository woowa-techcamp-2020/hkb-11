import { Observable } from '.'
import { Invoice } from '../../types'
import { EVENT } from '../utils/constants'

export class InvoiceModel extends Observable {
  invoices: Array<Invoice> = []
  highlightId: number
  sumEarning: number = 0
  sumSpending: number = 0
  earningToggle: boolean = true
  spendingToggle: boolean = true

  getInvoice(id: number): Invoice | undefined {
    return this.invoices.find((invoice) => invoice.id === id)
  }

  addSumEarning(offset: number) {
    this.sumEarning += offset
    this.emit(EVENT.SET_SUM_EARNING, this.sumEarning)
  }
  addSumSpending(offset: number) {
    this.sumSpending += offset
    this.emit(EVENT.SET_SUM_SPENDING, this.sumSpending)
  }
  addInvoice(invoice: Invoice) {
    this.invoices = [...this.invoices, invoice]
    const { category, amount } = invoice
    if (category.type === '수입') {
      this.emit(EVENTS.ADD_INVOICE, { invoice, hidden: !this.earningToggle })
      this.addSumEarning(amount)
      return
    }
    this.emit(EVENTS.ADD_INVOICE, { invoice, hidden: !this.spendingToggle })
    this.addSumSpending(amount)
  }
  setEarningToggle(value) {
    this.earningToggle = value
    this.emit(EVENT.EARNING_TOGGLE, value)
  }
  setSpendingToggle(value) {
    this.spendingToggle = value
    this.emit(EVENT.SPENDING_TOGGLE, value)
  }
  removeInvoice(id: number) {
    const invoice = this.invoices.find((x) => x.id === id)
    if (!invoice) return
    if (this.highlightId === id) this.highlightId = undefined
    const { category, amount } = invoice
    if (category.type === '수입') this.addSumEarning(-amount)
    else this.addSumSpending(-amount)
    this.invoices = this.invoices.filter((x) => x !== invoice)
    this.emit(EVENT.REMOVE_INVOICE, id)
  }
  setInvoices(invoices: Array<Invoice>) {
    this.clear()
    invoices.forEach((invoice) => {
      this.addInvoice(invoice)
    })
  }
  updateInvoice(invoice: Invoice) {
    const { id } = invoice
    this.removeInvoice(id)
    this.addInvoice(invoice)
  }
  highlight(id: number) {
    if (id === this.highlightId) {
      this.emit(EVENT.HIGHLIGHT_INVOICE, { id, flag: false })
      return
    }
    if (this.highlightId !== undefined) {
      this.emit(EVENT.HIGHLIGHT_INVOICE, { id: this.highlightId, flag: false })
    }
    this.emit(EVENT.HIGHLIGHT_INVOICE, { id, flag: true })
    this.highlightId = id
  }
  clear() {
    this.invoices = new Array<Invoice>()
    this.emit(EVENT.CLEAR_INVOICES)
  }
  findInvoiceById(id: number) {
    return this.invoices.find((invoice) => invoice.id === id)
  }
  render() {
    this.invoices.forEach((invoice) => {
      this.emit(EVENTS.ADD_INVOICE, { invoice })
    })
    this.emit(EVENTS.EARNING_TOGGLE, this.earningToggle)
    this.emit(EVENTS.SPENDING_TOGGLE, this.spendingToggle)
    this.emit(EVENTS.SET_SUM_EARNING, this.sumEarning)
    this.emit(EVENTS.SET_SUM_SPENDING, this.sumSpending)
  }
}
