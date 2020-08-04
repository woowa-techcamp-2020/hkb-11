import { templateToElement } from '../../utils/ElementGenerator'
import { View } from '../view'
import './style.scss'
import { paymentItemTemplate, template } from './template'

export default class ModalView extends View {
  $buttonPaymentModal: HTMLButtonElement
  $inputPayment: HTMLInputElement
  $buttonAddPayment: HTMLButtonElement
  $paymentList: HTMLDivElement
  constructor() {
    super(template)
    this.hide()
  }
  mount(): void {
    this.$buttonPaymentModal = <HTMLButtonElement>(
      this.query('.button-payment-modal')
    )
    this.$paymentList = <HTMLDivElement>this.query('.payment-list')
  }
  bindButtonPaymentModalHandler(handler) {
    this.$buttonPaymentModal.addEventListener('click', handler)
  }
  addPaymentItem(item) {
    const $paymentItem = templateToElement(paymentItemTemplate)
    const itemName = <HTMLDivElement>$paymentItem.querySelector('.item.center')
    itemName.innerText = item
    this.$paymentList.appendChild($paymentItem)
  }
}
