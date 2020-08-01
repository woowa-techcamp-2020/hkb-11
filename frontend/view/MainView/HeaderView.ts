import { View } from '../index'

const template = `
  <header id="header">
    <div class="row">
      <div class="item center main-title">룰루랄라 가계부</div>
      <button class="item right button-payment-modal">결제 수단 관리</button>
    </div>
  </header>
`

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
