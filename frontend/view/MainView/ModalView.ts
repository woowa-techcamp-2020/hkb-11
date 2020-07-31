import { createElement, View } from '../index'

export default class ModalView extends View {
  $buttonPaymentModal: HTMLButtonElement
  $inputPayment: HTMLInputElement
  $buttonAddPayment: HTMLButtonElement
  $paymentList: HTMLDivElement
  constructor() {
    super('payment-modal')
    this.hide()
  }
  mount(): void {
    this.$buttonPaymentModal = this.query(
      '.button-payment-modal'
    ) as HTMLButtonElement
    this.$paymentList = this.query('.payment-list') as HTMLDivElement
  }
  bindButtonPaymentModalHandler(handler) {
    this.$buttonPaymentModal.addEventListener('click', handler)
  }
  addPaymentItem(item) {
    const $itemElement = createElement('div', 'row')
    $itemElement.innerHTML = `
      <div class="item center">현대카드</div>
      <div class="item right">
        <button class="button-remove-payment">X</button>
      </div>
    `
    const itemName = $itemElement.querySelector(
      '.item.center'
    ) as HTMLDivElement
    itemName.innerText = item
    this.$paymentList.appendChild($itemElement)
  }
  init() {
    return `
      <div class="modal-background"></div>
      <div class="modal">
        <div class="modal-header">
          <div>
            결제 수단 관리
          </div>
          <div class="float button-close-modal">X</div>
        </div>
        <div class="modal-body">
          <form class="payment-form">
            <label>결제 수단 이름</label>
            <input class="input-payment" />
            <button class="button button-add-payment">등록</button>
          </form>
          <div class="rows payment-list"></div>
        </div>
      </div>`
  }
}
