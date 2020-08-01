import { createElement, View } from '../index'

const template = `
  <div id='payment-modal'>
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
    </div>
  </div>
`

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
    const $itemElement = createElement('div', 'row')
    $itemElement.innerHTML = `
      <div class="item center">현대카드</div>
      <div class="item right">
        <button class="button-remove-payment">X</button>
      </div>
    `
    const itemName = <HTMLDivElement>$itemElement.querySelector('.item.center')
    itemName.innerText = item
    this.$paymentList.appendChild($itemElement)
  }
}
