export const template: string = `
  <section id='invoice-list'>
  </section
`

export const dateRowtemplate: string = `
  <div class='invoice-wrapper'>
    <div class="date-row row">
      <div class="item left">
        <span class="date"></span><span class="day"></span>
      </div>
      <div class="item right">
        <div class="earning-sum">
          0
        </div>
        <div class="spending-sum">
          0
        </div>
      </div>
    </div>
    <div class="rows">
    </div>
  </div>
`

export const invoiceRowTemplate: string = `
  <div class='row'>
    <div class="float">
      <button class="button-edit">Edit</button>
    </div>
    <div class="hidden">
      <div class="hidden-id"></div>
      <div class="hidden-date"></div>
    </div>
    <div class="item left">
      <div class="category"></div>
      <div class="content"></div>
    </div>
    <div class="item right">
      <div class="payment"></div>
      <div class="amount"></div>
    </div>
  </div>
`
