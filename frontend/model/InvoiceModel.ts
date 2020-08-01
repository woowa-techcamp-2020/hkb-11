import { Observable } from '.'
import { Invoice } from '../../types'
import { EVENTS } from '../utils/constants'

export class InvoiceModel extends Observable {
  invoices: Array<Invoice> = []
  highlightId: number
  sumEarning: number = 0
  sumSpending: number = 0
  earningToggle: boolean = true
  spendingToggle: boolean = true

  addSumEarning(offset: number) {
    this.sumEarning += offset
    this.emit(EVENTS.SET_SUM_EARNING, this.sumEarning)
  }
  addSumSpending(offset: number) {
    this.sumSpending += offset
    this.emit(EVENTS.SET_SUM_SPENDING, this.sumSpending)
  }
  addInvoice(invoice: Invoice) {
    this.invoices = [...this.invoices, invoice]
    const { category, amount } = invoice
    this.emit(EVENTS.ADD_INVOICE, invoice)
    if (category.type === '수입') {
      this.addSumEarning(amount)
      return
    }
    this.addSumSpending(amount)
  }
  setEarningToggle(value) {
    this.earningToggle = value
    this.emit(EVENTS.EARNING_TOGGLE, value)
  }
  setSpendingToggle(value) {
    this.spendingToggle = value
    this.emit(EVENTS.SPENDING_TOGGLE, value)
  }
  removeInvoice(id) {
    const invoice = this.invoices.find((x) => x.id === id)
    if (!invoice) return
    const { category, amount } = invoice
    if (category.type === '수입') this.addSumEarning(-amount)
    else this.addSumSpending(-amount)
    this.invoices = this.invoices.filter((x) => x !== invoice)
    this.emit(EVENTS.REMOVE_INVOICE, id)
  }
  setInvoices(invoices: Array<Invoice>) {
    this.clear()
    this.invoices = invoices
    this.invoices.forEach((invoice) => {
      this.addInvoice(invoice)
    })
  }
  updateInvoice(invoice: Invoice) {
    const { id } = invoice
    this.removeInvoice(id)
    this.emit(EVENTS.REMOVE_INVOICE, id)
    this.addInvoice(invoice)
    this.emit(EVENTS.ADD_INVOICE, invoice)
  }
  highlight(id: number) {
    if (id === this.highlightId) {
      this.emit(EVENTS.HIGHLIGHT_INVOICE, { id, flag: false })
      return
    }
    if (this.highlightId !== undefined) {
      this.emit(EVENTS.HIGHLIGHT_INVOICE, { id: this.highlightId, flag: false })
    }
    this.emit(EVENTS.HIGHLIGHT_INVOICE, { id, flag: true })
    this.highlightId = id
  }
  clear() {
    this.invoices = new Array<Invoice>()
    this.emit(EVENTS.CLEAR_INVOICES)
  }
}
