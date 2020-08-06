export const template: string = /*html*/ `
  <section id='invoice-list'>
  </section>
`

export const wrapperRowTemplate: string = /*html*/ `
  <div class='invoice-wrapper'>
    <div class="date-row row">
      <div class="item left">
        <span class="date"></span><span class="day"></span><span class="hidden-date hidden"></span>
      </div>
      <div class="item right">
        <div class="earning-sum-pre">+</div>
        <div class="earning-sum">0</div>
        <div class="earning-sum-post">원</div>
        <div class="spending-sum-pre">–</div>
        <div class="spending-sum">0</div>
        <div class="spending-sum-post">원</div>
      </div>
    </div>
    <div class="rows">
    </div>
  </div>
`

export const invoiceRowTemplate: string = /*html*/ `
  <div class='row invoice'>
    <div class="float">
      <i class="button-edit f7-icons">pencil_circle</i>
    </div>
    <div class="hidden">
      <div class="hidden-id"></div>
      <div class="hidden-date"></div>
    </div>
    <div class="item left">
      <div class="type hidden"></div>
      <div class="category"></div>
      <div class="content"></div>
    </div>
    <div class="item right">
      <div class="payment"></div>
      <div class="amount-pre"></div>
      <div class="amount"></div>
      <div class="amount-post">
        원
      </div>
    </div>
  </div>
`
