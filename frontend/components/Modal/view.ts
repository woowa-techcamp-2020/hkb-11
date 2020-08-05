import { PaymentMethod } from '../../../types'
import { CLASS, MODAL_CLASS } from '../../utils/constants'
import { templateToElement } from '../../utils/ElementGenerator'
import { View } from '../view'
import './style.scss'
import { paymentTemplate, template } from './template'

export default class ModalView extends View {
  $closeBtn: HTMLElement
  $inputPayment: HTMLInputElement
  $buttonAddPayment: HTMLButtonElement
  $paymentList: HTMLDivElement

  constructor() {
    super(template)
    this.hide()
  }
  mount(): void {
    this.$closeBtn = <HTMLElement>this.query(`.${MODAL_CLASS.CLOSE_BTN}`)
    this.$paymentList = <HTMLDivElement>this.query('.payment-list')

    this.$element.addEventListener('click', this.onClickHandler.bind(this))
  }

  onClickHandler(e) {
    const $closeBtn = e.target.closest(`.${MODAL_CLASS.CLOSE_BTN}`)
    if ($closeBtn) {
      this.closeModal()
      return
    }
  }

  showModal() {
    this.$element.classList.remove(CLASS.HIDDEN)
  }

  closeModal() {
    this.$element.classList.add(CLASS.HIDDEN)
  }

  setPayments(payments: PaymentMethod[]) {
    payments.forEach((payment) => {
      this.addPayment(payment)
    })
  }

  addPayment(payment: PaymentMethod) {
    const $payment = templateToElement(paymentTemplate)
    const itemName = <HTMLDivElement>(
      $payment.querySelector(`.${CLASS.ITEM}.${CLASS.CENTER}`)
    )
    itemName.innerText = payment.title
    this.$paymentList.appendChild($payment)
  }
}
