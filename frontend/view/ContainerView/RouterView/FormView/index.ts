import { Category, Invoice, PaymentMethod } from '../../../../../types'
import { CLASS, CONSTANT, FORM_CLASS } from '../../../../utils/constants'
import { templateToElement } from '../../../../utils/ElementGenerator'
import { View } from '../../../index'
import './style.scss'
import { optionTemplate, template } from './template'

function formatAmount($target: HTMLInputElement) {
  $target.value = $target.value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function getNumberByAmount(amount: string): number {
  return parseInt(amount.replace(',', ''))
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
  $remove: HTMLButtonElement
  $clear: HTMLButtonElement
  invoiceId: number = 0
  categoryType: string = CONSTANT.SPENDING
  invoiceAddHandler: Function
  invoiceRemoveHandler: Function
  invoiceUpdateHandler: Function

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
    this.$remove = <HTMLButtonElement>this.query(`.${FORM_CLASS.REMOVE_BTN}`)
    this.$clear = <HTMLButtonElement>this.query(`.${FORM_CLASS.CLEAR_BTN}`)
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

    this.setCategorySelect()
    this.setCategoryOptions()
  }

  setCategorySelect() {
    const $selectedOption = <HTMLOptionElement>(
      this.$category.querySelector(`option[value='${this.$category.value}']`)
    )
    if ($selectedOption.dataset.type !== this.categoryType) {
      this.$category.value = ''
    }
  }

  setCategoryOptions() {
    const $options = <HTMLOptionElement[]>(
      Array.from(this.$category.querySelectorAll(`option:not([disabled])`))
    )
    $options.forEach(($option) => {
      if ($option.dataset.type !== this.categoryType) {
        $option.classList.add(CLASS.HIDDEN)
        return
      }
      $option.classList.remove(CLASS.HIDDEN)
    })
  }

  bindInvoiceAddHandler(handler) {
    this.invoiceAddHandler = handler
  }

  bindInvoiceRemoveHandler(handler) {
    this.invoiceRemoveHandler = handler
  }

  bindInvoiceUpdateHandler(handler) {
    this.invoiceUpdateHandler = handler
  }

  onClickHandler(e) {
    if (!(e.target instanceof HTMLElement)) return

    const $clearBtn = e.target.closest(`.${FORM_CLASS.CLEAR_BTN}`)
    if ($clearBtn) {
      this.clearForm()
      return
    }

    const $removeBtn = e.target.closest(`.${FORM_CLASS.REMOVE_BTN}`)
    if ($removeBtn) {
      const isRemoveConfirm = confirm('정말 삭제하시겠습니까?')
      if (!isRemoveConfirm) return

      this.invoiceRemoveHandler(this.invoiceId)
      return
    }

    const $earningToggle = e.target.closest(`.${FORM_CLASS.EARNING_TOGGLE}`)
    if ($earningToggle) {
      this.setCategoryType(CONSTANT.EARNING)
      return
    }

    const $spendingToggle = e.target.closest(`.${FORM_CLASS.SPENDING_TOGGLE}`)
    if ($spendingToggle) {
      this.setCategoryType(CONSTANT.SPENDING)
      return
    }

    const $submitBtn = e.target.closest(`.${FORM_CLASS.SUBMIT_BTN}`)
    if ($submitBtn) {
      if (this.invoiceId > 0) {
        this.invoiceUpdateHandler(this.getInvoiceData())
        return
      }

      this.invoiceAddHandler(this.getInvoiceData())
      return
    }
  }

  getInvoiceData(): Invoice {
    const $selectedCategoryOption = <HTMLOptionElement>(
      this.$category.querySelector(`option[value='${this.$category.value}']`)
    )
    const $selectedPaymentOption = <HTMLOptionElement>(
      this.$payment.querySelector(`option[value='${this.$payment.value}']`)
    )

    const invoice: Invoice = {
      id: this.invoiceId,
      date: new Date(this.$date.value),
      category: {
        id: +this.$category.value,
        type: this.categoryType,
        title: $selectedCategoryOption.innerText,
      },
      paymentMethod: {
        id: +this.$payment.value,
        title: $selectedPaymentOption.innerText,
      },
      amount: getNumberByAmount(this.$amount.value),
      item: this.$item.value,
    }

    return invoice
  }

  setInvoiceData(invoice: Invoice) {
    this.invoiceId = invoice.id
    this.$date.value = formatDate(invoice.date)
    this.$item.value = invoice.item
    this.$category.value = invoice.category.title
    this.setCategoryType(invoice.category.type)
    this.$payment.value = invoice.paymentMethod.title
    this.$amount.value = invoice.amount.toString()
    formatAmount(this.$amount)

    this.changeFloatBtn(FORM_CLASS.REMOVE_BTN)
  }

  setCategories(categories: Category[]) {
    categories.forEach((category) => {
      const $option = <HTMLOptionElement>templateToElement(optionTemplate)
      $option.value = category.id.toString()
      $option.innerText = category.title
      $option.dataset.type = category.type

      if (this.categoryType !== category.type) {
        $option.classList.add(CLASS.HIDDEN)
      }

      this.$category.appendChild($option)
    })
  }

  setPayments(payments: PaymentMethod[]) {
    payments.forEach((payment) => {
      const $option = <HTMLOptionElement>templateToElement(optionTemplate)
      $option.value = payment.id.toString()
      $option.innerText = payment.title

      this.$payment.appendChild($option)
    })
  }

  changeFloatBtn(showClass: string): void {
    if (showClass === FORM_CLASS.REMOVE_BTN) {
      this.$remove.classList.remove(CLASS.HIDDEN)
      this.$clear.classList.add(CLASS.HIDDEN)
    } else if (showClass === FORM_CLASS.CLEAR_BTN) {
      this.$remove.classList.add(CLASS.HIDDEN)
      this.$clear.classList.remove(CLASS.HIDDEN)
    }
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
    this.invoiceId = 0
  }
}
