import { Invoice } from '../../../types'
import { CONSTANT, LIST_CLASS } from '../../utils/constants'
import { templateToElement } from '../../utils/ElementGenerator'
import { getSibling, getText, removeElement, setText, View } from '../view'
import './style.scss'
import { dateRowtemplate, invoiceRowTemplate, template } from './template'

const days = ['월', '화', '수', '목', '금', '토', '일']
function getPrettyDate(date: Date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}
function getPrettyDay(date: Date) {
  return days[date.getDay()]
}

function addAmountInDateRowSum(invoice: Invoice, dateRow: HTMLDivElement) {
  const { category, amount } = invoice
  if (category.type === '수입') {
    const earningSum = <HTMLInputElement>dateRow.querySelector('.earning-sum')
    const sum = parseInt(earningSum.innerText)
    earningSum.innerText = String(sum + amount)
  } else {
    const spendingSum = <HTMLInputElement>dateRow.querySelector('.spending-sum')
    const sum = parseInt(spendingSum.innerText)
    spendingSum.innerText = String(sum + amount)
  }
}
function appendRowInDateRow(invoice, $dateRow) {
  const { date } = invoice
  const $rows = <HTMLInputElement>$dateRow.querySelector('.rows')
  if ($rows === null) return
  const $invoiceRow = createInvoiceRow(invoice)
  if (invoice.category.type === CONSTANT.EARNING) {
    $invoiceRow.classList.add(LIST_CLASS.EARNING)
  } else {
    $invoiceRow.classList.add(LIST_CLASS.SPENDING)
  }

  const targetRow = Array.from($rows.children).find(($row: HTMLDivElement) => {
    if (parseInt(getText($row, '.hidden-date')) > +date) {
      return true
    }
  })
  $rows.insertBefore($invoiceRow, targetRow)
  return $invoiceRow
}

function createDateRow(date: Date) {
  const $dateRow = templateToElement(dateRowtemplate) as HTMLDivElement
  setText($dateRow, '.date', getPrettyDate(date))
  setText($dateRow, '.day', getPrettyDay(date))

  return $dateRow
}
function createInvoiceRow(invoice: Invoice) {
  const { id, date, category, item, paymentMethod, amount } = invoice

  const $invoiceRow = templateToElement(invoiceRowTemplate) as HTMLDivElement
  const type = category.type === '수입' ? 'earning' : 'spending'
  $invoiceRow.classList.add('invoice', type)
  setText($invoiceRow, '.hidden-id', id)
  setText($invoiceRow, '.hidden-date', +date)
  setText($invoiceRow, '.category', category.title)
  setText($invoiceRow, '.type', category.type)
  setText($invoiceRow, '.content', item)
  setText($invoiceRow, '.payment', paymentMethod.title)
  setText($invoiceRow, '.amount', amount)
  return $invoiceRow
}

export default class ListView extends View {
  constructor() {
    super(template)
  }
  clear() {
    const $wrapperRows = this.queryAll('.invoice-wrapper')
    $wrapperRows.forEach(($wrapperRow) => {
      removeElement($wrapperRow)
    })
  }
  findDateRow(date: Date): HTMLDivElement {
    const dateRows = this.queryAll('.invoice-wrapper')
    if (dateRows === null) return null
    return <HTMLDivElement>(
      Array.from(dateRows).find(
        ($dateRow: HTMLDivElement) =>
          getText($dateRow, '.date') === getPrettyDate(date)
      )
    )
  }
  addDateRow(date: Date) {
    const $dateRow = createDateRow(date)
    this.$element.appendChild($dateRow)
    return $dateRow
  }
  addInvoice(invoice: Invoice, hidden = false) {
    const { date } = invoice
    const $dateRow = this.findDateRow(date) || this.addDateRow(date)
    addAmountInDateRowSum(invoice, $dateRow)
    const $row = appendRowInDateRow(invoice, $dateRow)
    if (hidden) {
      $row.classList.add('hidden')
    }
  }
  getInvoiceRows() {
    return Array.from(this.queryAll('.invoice'))
  }
  getInvoiceRowsByType(type) {
    return this.getInvoiceRows().filter(
      (x) => getText(<HTMLDivElement>x, '.type') === type
    )
  }
  findInvoiceRow(id: Number): HTMLDivElement {
    return <HTMLDivElement>(
      this.getInvoiceRows().find(
        ($row) => getText(<HTMLDivElement>$row, '.hidden-id') === String(id)
      )
    )
  }
  removeInvoice(id: number): void {
    const $invoiceRow = this.findInvoiceRow(id)
    if (!$invoiceRow) return
    if (getSibling($invoiceRow).length === 1) {
      const $dateRow = $invoiceRow.closest('.invoice-wrapper')
      removeElement($dateRow)
      return
    }
    removeElement($invoiceRow)
  }
  bindInvoiceEditHandler(handler: Function) {
    this.$element.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        const $edit = target.closest('.button-edit')
        if (!$edit) return
        const $invoiceRow = <HTMLDivElement>$edit.closest('.invoice')
        handler(parseInt(getText($invoiceRow, '.hidden-id')))
      }
    })
  }
  bindInvoiceClickledHandler(handler: Function) {
    this.$element.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        const $invoiceRow = <HTMLDivElement>target.closest('.invoice')
        if (!$invoiceRow) return
        handler(parseInt(getText($invoiceRow, '.hidden-id')))
      }
    })
  }
  highlightInvoice(id: number, flag: boolean): void {
    const $invoiceRow = this.findInvoiceRow(id)
    if (!$invoiceRow) return
    if (flag) $invoiceRow.classList.add('highlight')
    else $invoiceRow.classList.remove('highlight')
  }
  setEarningVisible(flag: boolean) {
    this.getInvoiceRowsByType('수입').forEach(($row) => {
      if (flag) $row.classList.remove('hidden')
      else $row.classList.add('hidden')
    })
  }
  setSpendingVisible(flag: boolean) {
    this.getInvoiceRowsByType('지출').forEach(($row) => {
      if (flag) $row.classList.remove('hidden')
      else $row.classList.add('hidden')
    })
  }
  mount(): void {}
}
