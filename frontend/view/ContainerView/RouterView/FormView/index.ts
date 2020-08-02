import { Invoice } from '../../../../../types'
import { FORM_CLASS } from '../../../../utils/constants'
import { View } from '../../../index'
import './style.scss'
import { template } from './template'

function formatAmount($target: HTMLInputElement) {
  $target.value = $target.value
    .toString()
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default class FormView extends View {
  $inputAmount: HTMLInputElement
  $inputDate: HTMLInputElement
  $inputItem: HTMLInputElement
  $selectCategory: HTMLSelectElement
  $selectPayment: HTMLSelectElement
  $submit: HTMLButtonElement

  constructor() {
    super(template)

    this.$element.addEventListener('click', this.onClickHandler.bind(this))
    this.$element.addEventListener('input', this.onInputHandler.bind(this))
    this.$element.addEventListener('keydown', this.onKeydownHandler.bind(this))
  }

  mount(): void {
    this.$inputAmount = <HTMLInputElement>(
      this.query(`.${FORM_CLASS.INPUT_AMOUNT}`)
    )
    this.$inputDate = <HTMLInputElement>this.query(`.${FORM_CLASS.INPUT_DATE}`)
    this.$inputItem = <HTMLInputElement>this.query(`.${FORM_CLASS.INPUT_ITEM}`)
    this.$selectCategory = <HTMLSelectElement>(
      this.query(`.${FORM_CLASS.SELECT_CATEGORY}`)
    )
    this.$selectPayment = <HTMLSelectElement>(
      this.query(`.${FORM_CLASS.SELECT_PAYMENT}`)
    )
    this.$submit = <HTMLButtonElement>this.query('.button-submit')
  }

  bindInvoiceAddHandler(handler) {
    this.$submit.addEventListener('click', handler)
  }

  onClickHandler() {
    this.$element.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return

      const $clearBtn = e.target.closest(`.${FORM_CLASS.CLEAR_BTN}`)
      if ($clearBtn) {
        this.clearForm()
        return
      }
    })
  }

  getInvoiceData(): Invoice {
    const invoice: Invoice = {
      date: new Date(this.$inputDate.value),
      category: {
        type: '수입',
        title: this.$selectCategory.value,
      },
      paymentMethod: {
        userId: 'agrajak2',
        title: this.$selectPayment.value,
      },
      amount: +this.$inputAmount.value,
      item: this.$inputItem.value,
    }

    return invoice
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
    this.$inputAmount.value = ''
    this.$inputDate.value = ''
    this.$inputItem.value = ''
    this.$selectCategory.value = ''
    this.$selectPayment.value = ''
  }
}
