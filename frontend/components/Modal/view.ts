import { PaymentMethod } from '../../../types'
import { CLASS, MODAL_ID } from '../../utils/constants'
import { templateToElement } from '../../utils/ElementGenerator'
import { View } from '../view'
import './style.scss'
import { paymentTemplate, template } from './template'

export default class ModalView extends View {
  $buttonPaymentModal: HTMLButtonElement
  $paymentModal: HTMLDivElement
  $inputPayment: HTMLInputElement
  $buttonAddPayment: HTMLButtonElement
  $paymentList: HTMLDivElement

  constructor() {
    super(template)
    this.hide()
  }
  mount(): void {
    this.$buttonPaymentModal = <HTMLButtonElement>(
      document.querySelector('.button-payment-modal')
    )
    this.$paymentList = <HTMLDivElement>this.query('.payment-list')
    this.$paymentModal = <HTMLDivElement>(
      this.query(`.${MODAL_ID.PAYMENT_MODAL}`)
    )
  }
  bindButtonPaymentModalHandler(handler) {
    // this.$buttonPaymentModal.addEventListener('click', handler)
  }

  showModal() {
    this.$paymentModal.classList.remove(CLASS.HIDDEN)
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
