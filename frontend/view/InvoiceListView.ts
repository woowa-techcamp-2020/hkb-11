import { View } from './index'

export default class InvoiceListView extends View {
  constructor() {
    super('invoice-list', 'section')
  }
  mount(): void {}
  init() {
    return `
      <div class="invoice-wrapper">
        <div class="date-row row">
          <div class="item left">
            <span class="date">6월 16일</span><span class="day">화</span>
          </div>
          <div class="item right">
            <div class="earning-sum">
              +12원
            </div>
            <div class="spending-sum">
              -12,123원
            </div>
          </div>
        </div>
        <div class="rows">
          <div class="row invoice earning">
            <div class="float">
              <button class="button-edit">Edit</button>
            </div>
            <div class="item left">
              <div class="category">
                쇼핑/뷰티
              </div>
              <div class="content">
                미용실
              </div>
            </div>
            <div class="item right payment">
              <div class="payment">
                현대카드
              </div>
              <div class="amount">
                122,211원
              </div>
            </div>
          </div>
          <div class="row invoice spending">
            <div class="item left">
              <div class="category">
                음식
              </div>
              <div class="content">
                서울김밥
              </div>
            </div>
            <div class="item right payment">
              <div class="payment">
                카카오페이
              </div>
              <div class="amount">
                12,211원
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
