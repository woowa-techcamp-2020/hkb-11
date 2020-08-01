import { Invoice } from '../../../../types'
import {
  createElement,
  getSibling,
  getText,
  removeElement,
  setText,
  View,
} from '../../index'

const days = ['월', '화', '수', '목', '금', '토', '일']
function getPrettyDate(date: Date) {
  return `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`
}
function getPrettyDay(date: Date) {
  return days[date.getDay()]
}

function addAmountInDateRowSum(invoice: Invoice, dateRow: HTMLDivElement) {
  const { category, amount } = invoice
  if (category.type === '수입') {
    const earningSum = dateRow.querySelector('.earning-sum') as HTMLDivElement
    const sum = parseInt(earningSum.innerText)
    earningSum.innerText = String(sum + amount)
  } else {
    const spendingSum = dateRow.querySelector('.spending-sum') as HTMLDivElement
    const sum = parseInt(spendingSum.innerText)
    spendingSum.innerText = String(sum + amount)
  }
}
function appendRowInDateRow(invoice, $dateRow) {
  const { date } = invoice
  const $rows = $dateRow.querySelector('.rows') as HTMLDivElement
  if ($rows === null) return
  const $invoiceRow = createInvoiceRow(invoice)
  const targetRow = Array.from($rows.children).find(($row) => {
    if (parseInt(getText($row as HTMLDivElement, '.hidden-date')) > +date) {
      return true
    }
  })
  $rows.insertBefore($invoiceRow, targetRow)
}

function createDateRow(date: Date) {
  const $element = createElement('div', 'invoice-wrapper')
  $element.innerHTML = `
  <div class="date-row row">
    <div class="item left">
      <span class="date"></span><span class="day"></span>
    </div>
    <div class="item right">
      <div class="earning-sum">
        0
      </div>
      <div class="spending-sum">
        0
      </div>
    </div>
  </div>
  <div class="rows">
  </div>`
  setText($element, '.date', getPrettyDate(date))
  setText($element, '.day', getPrettyDay(date))

  return $element
}
function createInvoiceRow(invoice: Invoice) {
  const { id, date, category, item, paymentMethod, amount } = invoice
  const $invoiceRow = createElement('div', 'row')
  const type = category.type === '수입' ? 'earning' : 'spending'
  $invoiceRow.classList.add('invoice', type)
  $invoiceRow.innerHTML = `
    <div class="float">
      <button class="button-edit">Edit</button>
    </div>
    <div class="hidden">
      <div class="hidden-id"></div>
      <div class="hidden-date"></div>
    </div>
    <div class="item left">
      <div class="category"></div>
      <div class="content"></div>
    </div>
    <div class="item right">
      <div class="payment"></div>
      <div class="amount"></div>
    </div>
  `
  setText($invoiceRow, '.hidden-id', id)
  setText($invoiceRow, '.hidden-date', +date)
  setText($invoiceRow, '.category', category.title)
  setText($invoiceRow, '.content', item)
  setText($invoiceRow, '.payment', paymentMethod.title)
  setText($invoiceRow, '.amount', amount)
  return $invoiceRow
}

export default class ListView extends View {
  constructor() {
    super('invoice-list', 'section')
  }
  findDateRow(date: Date): HTMLDivElement {
    const dateRows = this.$element.querySelectorAll('.invoice-wrapper')
    if (dateRows === null) return null
    return Array.from(dateRows).find(
      ($dateRow) =>
        getText($dateRow as HTMLDivElement, '.date') === getPrettyDate(date)
    ) as HTMLDivElement
  }
  addDateRow(date: Date) {
    const $dateRow = createDateRow(date)
    this.$element.appendChild($dateRow)
    return $dateRow
  }
  addInvoice(invoice: Invoice) {
    const { date } = invoice
    const $dateRow = this.findDateRow(date) || this.addDateRow(date)
    addAmountInDateRowSum(invoice, $dateRow)
    appendRowInDateRow(invoice, $dateRow)
  }
  removeInvoice(id: number): void {
    const $invoiceRow = Array.from(this.queryAll('.invoice')).find(
      ($row) => getText($row as HTMLDivElement, '.hidden-id') === String(id)
    )
    if (getSibling($invoiceRow).length === 1) {
      const $dateRow = $invoiceRow.closest('.invoice-wrapper')
      removeElement($dateRow)
      return
    }
    removeElement($invoiceRow)
  }
  bindInvoiceClickedHandler(handler: Function) {
    this.$element.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        const $invoiceRow = target.closest('.invoice') as HTMLDivElement
        if (!$invoiceRow) return
        handler(parseInt(getText($invoiceRow, '.hidden-id')))
      }
    })
  }
  mount(): void {}
  init() {
    return ''
  }
}
