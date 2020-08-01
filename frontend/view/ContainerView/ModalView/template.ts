export const template: string = `
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

export const paymentItemTemplate: string = `
  <div class='row'>
    <div class="item center">현대카드</div>
    <div class="item right">
      <button class="button-remove-payment">X</button>
    </div>
  </div>
`
