import { View } from '../view'
import './style.scss'
import { template } from './template'

export default class HeaderView extends View {
  $buttonPaymentModal: HTMLButtonElement
  constructor() {
    super(template)
  }
  mount(): void {
    this.$buttonPaymentModal = <HTMLButtonElement>(
      this.query('.button-payment-modal')
    )
  }
  bindPaymentModalHandler(handler) {
    this.$buttonPaymentModal.addEventListener('click', handler)
  }
}
