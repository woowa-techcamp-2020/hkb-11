import { View } from './index'

export default class InvoiceFormView extends View {
  $clearForm: HTMLButtonElement
  $submit: HTMLButtonElement

  constructor() {
    super('invoice-form', 'section')
  }
  mount(): void {}
  init() {
    return `
      <form>
        <div class="float">
          <button class="button-clear-form">내용 지우기</button>
          <button class="button-remove-invoice hidden">삭제</button>
        </div>
        <div class="row">
          <label>분류</label>
          <button class="button earning-toggle active">수입</button>
          <button class="button spending-toggle">지출</button>
        </div>
        <div class="row">
          <div class="item">
            <label>날짜</label>
            <input type="date" class="input-date" />
          </div>
          <div class="item">
            <label>카테고리</label>
            <select class="select-category">
              <option value="">선택하세요</option>
            </select>
          </div>
          <div class="item">
            <label>결제수단</label>
            <select class="select-payment">
              <option value="">선택하세요</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <label>금액</label>
            <input class="input-amount" />
          </div>
          <div class="item">
            <label>내용</label>
            <input class="input-item" />
          </div>
        </div>
        <div class="row">
          <button class="button button-submit">확인</button>
        </div>
      </form>
    `
  }
}
