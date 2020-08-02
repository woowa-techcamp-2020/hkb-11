import { View } from '../index'

export default class HeaderView extends View {
  $buttonPaymentModal: HTMLButtonElement
  constructor() {
    super('header', 'header')
  }
  mount(): void {
    this.$buttonPaymentModal = <HTMLButtonElement>(
      this.query('.button-payment-modal')
    )
  }
  bindPaymentModalHandler(handler) {
    this.$buttonPaymentModal.addEventListener('click', handler)
  }
  init() {
    return `
      <div class="row">
        <div class="item center main-title">룰루랄라 가계부</div>
        <button class="item right button-payment-modal">결제 수단 관리</button>
      </div>
    `
  }
}
