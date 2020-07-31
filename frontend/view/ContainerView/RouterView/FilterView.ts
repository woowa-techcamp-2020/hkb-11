import { setText, View } from '../../index'

export default class FilterView extends View {
  constructor() {
    super('invoice-filter', 'section')
    this.setEarningTotal(0)
    this.setSpendingTotal(0)
  }
  setEarningTotal(amount) {
    setText(this.$element, '.earning-total', `${amount}원`)
  }
  setSpendingTotal(amount) {
    setText(this.$element, '.spending-total', `${amount}원`)
  }
  mount(): void {}
  init() {
    return `
    <div>
      <input type="checkbox" class="earning-checkbox" />
      <label>수입</label>
      <label class="earning-total">3,234,123원</label>
    </div>
    <div>
      <input type="checkbox" class="spending-checkbox" />
      <label>지출</label>
      <label class="spending-total">134,123원</label>
    </div>
    `
  }
}
