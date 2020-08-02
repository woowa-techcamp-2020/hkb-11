import { setText, View } from '../../index'

export default class FilterView extends View {
  $earningCheckBox: HTMLInputElement
  $spendingCheckBox: HTMLInputElement
  onEarningToggleHandler: Function
  onSpendingToggleHandler: Function
  constructor() {
    super('invoice-filter', 'section')
    this.setEarningToggle(true)
      .setSpendingToggle(true)
      .setEarningTotal(0)
      .setSpendingTotal(0)
    this.$element.addEventListener('input', this.onInputChanged.bind(this))
  }
  onInputChanged({ target }) {
    if (target instanceof HTMLInputElement) {
      const { checked } = target
      if (target === this.$earningCheckBox) this.onEarningToggleHandler(checked)
      if (target === this.$spendingCheckBox)
        this.onSpendingToggleHandler(checked)
    }
  }
  setEarningTotal(amount) {
    setText(this.$element, '.earning-total', `${amount}원`)
    return this
  }
  setSpendingTotal(amount) {
    setText(this.$element, '.spending-total', `${amount}원`)
    return this
  }
  setEarningToggle(value: boolean) {
    this.$earningCheckBox.checked = value
    return this
  }
  setSpendingToggle(value: boolean) {
    this.$spendingCheckBox.checked = value
    return this
  }
  bindEarningToggleHandler(handler) {
    this.onEarningToggleHandler = handler
  }
  bindSpendingToggleHandler(handler) {
    this.onSpendingToggleHandler = handler
  }
  mount(): void {
    this.$earningCheckBox = <HTMLInputElement>this.query('.earning-checkbox')
    this.$spendingCheckBox = <HTMLInputElement>this.query('.spending-checkbox')
  }
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
