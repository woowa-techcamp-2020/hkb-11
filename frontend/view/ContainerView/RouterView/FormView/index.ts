import { Invoice } from '../../../../../types'
import { CLASS, CONSTANT, FORM_CLASS } from '../../../../utils/constants'
import { View } from '../../../index'
import './style.scss'
import { template } from './template'

function formatAmount($target: HTMLInputElement) {
  $target.value = $target.value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatDate(date: Date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  const year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default class FormView extends View {
  $earning: HTMLButtonElement
  $spending: HTMLButtonElement
  $amount: HTMLInputElement
  $date: HTMLInputElement
  $item: HTMLInputElement
  $category: HTMLSelectElement
  $payment: HTMLSelectElement
  $submit: HTMLButtonElement
  categoryType: string = CONSTANT.SPENDING

  constructor() {
    super(template)

    this.$element.addEventListener('click', this.onClickHandler.bind(this))
    this.$element.addEventListener('input', this.onInputHandler.bind(this))
    this.$element.addEventListener('keydown', this.onKeydownHandler.bind(this))
  }

  mount(): void {
    this.$earning = <HTMLButtonElement>(
      this.query(`.${FORM_CLASS.EARNING_TOGGLE}`)
    )
    this.$spending = <HTMLButtonElement>(
      this.query(`.${FORM_CLASS.SPENDING_TOGGLE}`)
    )

    this.$amount = <HTMLInputElement>this.query(`.${FORM_CLASS.INPUT_AMOUNT}`)
    this.$date = <HTMLInputElement>this.query(`.${FORM_CLASS.INPUT_DATE}`)
    this.$item = <HTMLInputElement>this.query(`.${FORM_CLASS.INPUT_ITEM}`)
    this.$category = <HTMLSelectElement>(
      this.query(`.${FORM_CLASS.SELECT_CATEGORY}`)
    )
    this.$payment = <HTMLSelectElement>(
      this.query(`.${FORM_CLASS.SELECT_PAYMENT}`)
    )
    this.$submit = <HTMLButtonElement>this.query('.button-submit')

    this.setCategoryType(CONSTANT.SPENDING)
  }

  setCategoryType(categoryType) {
    if (categoryType === CONSTANT.SPENDING) {
      this.$spending.classList.add(CLASS.ACTIVE)
      this.$earning.classList.remove(CLASS.ACTIVE)
    } else if (categoryType === CONSTANT.EARNING) {
      this.$spending.classList.remove(CLASS.ACTIVE)
      this.$earning.classList.add(CLASS.ACTIVE)
    } else {
      return
    }
    this.categoryType = categoryType
  }

  bindInvoiceAddHandler(handler) {
    this.$submit.addEventListener('click', handler)
  }

  onClickHandler(e) {
    if (!(e.target instanceof HTMLElement)) return
    const $clearBtn = e.target.closest(`.${FORM_CLASS.CLEAR_BTN}`)
    if ($clearBtn) {
      this.clearForm()
      return
    }

    const $earningToggle = e.target.closest(`.${FORM_CLASS.EARNING_TOGGLE}`)
    console.log($earningToggle)
    if ($earningToggle) {
      this.setCategoryType(CONSTANT.EARNING)
      return
    }

    const $spendingToggle = e.target.closest(`.${FORM_CLASS.SPENDING_TOGGLE}`)
    if ($spendingToggle) {
      this.setCategoryType(CONSTANT.SPENDING)
      return
    }
  }

  getInvoiceData(): Invoice {
    const invoice: Invoice = {
      date: new Date(this.$date.value),
      category: {
        type: '수입',
        title: this.$category.value,
      },
      paymentMethod: {
        userId: 'agrajak2',
        title: this.$payment.value,
      },
      amount: +this.$amount.value,
      item: this.$item.value,
    }

    return invoice
  }

  setInvoiceData(invoice: Invoice) {
    this.$date.value = formatDate(invoice.date)
    this.$item.value = invoice.item
    this.$category.value = invoice.category.title
    this.$payment.value = invoice.paymentMethod.title
    this.$amount.value = invoice.amount.toString()
    formatAmount(this.$amount)
    this.setCategoryType(invoice.category.type)
  }

  onKeydownHandler(e) {
    if (!(e.target instanceof HTMLElement)) return

    if (e.target.classList.contains(FORM_CLASS.INPUT_AMOUNT)) {
      if (e.target.value === '' && e.keyCode === 48) {
        e.preventDefault()
        return
      }
      return
    }
  }

  onInputHandler(e) {
    if (!(e.target instanceof HTMLElement)) return

    if (e.target.classList.contains(FORM_CLASS.INPUT_AMOUNT)) {
      formatAmount(e.target)
      return
    }
  }

  clearForm() {
    this.$amount.value = ''
    this.$date.value = ''
    this.$item.value = ''
    this.$category.value = ''
    this.$payment.value = ''
  }
}
