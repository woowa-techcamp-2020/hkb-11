import { formatAmount } from '../../utils'
import { setText, View } from '../view'
import './style.scss'
import { template } from './template'

export default class FilterView extends View {
  $earningCheckBox: HTMLInputElement
  $spendingCheckBox: HTMLInputElement
  onEarningToggleHandler: Function
  onSpendingToggleHandler: Function
  constructor() {
    super(template)
    this.$element.addEventListener('input', this.onInputChanged.bind(this))
    this.clear()
  }
  clear() {
    this.setEarningToggle(true)
      .setSpendingToggle(true)
      .setEarningTotal(0)
      .setSpendingTotal(0)
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
    setText(this.$element, '.earning-total', `${formatAmount(amount)}원`)
    return this
  }
  setSpendingTotal(amount) {
    setText(this.$element, '.spending-total', `${formatAmount(amount)}원`)
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
}
