import { CHART_CLASS, CLASS } from '../../utils/constants'
import { View } from '../view'
import { BarChartView } from './BarChartView'
import { PiChartView } from './PiChartView'
import './style.scss'
import { template } from './template'
export default class ChartView extends View {
  piChartView: PiChartView
  barChartView: BarChartView
  $pi: HTMLInputElement
  $bar: HTMLInputElement
  constructor() {
    super(template)
    this.piChartView.appendToView(this)
    this.barChartView.appendToView(this)
    this.$element.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLInputElement)) return
      if (target === this.$pi) {
        this.showPiChart()
      }
      if (target === this.$bar) {
        this.showBarChart()
      }
    })
  }
  showBarChart() {
    this.$bar.checked = true
    this.piChartView.hide()
    this.barChartView.show()
    this.setCheckboxLabel(this.$bar.id, true)
    this.setCheckboxLabel(this.$pi.id, false)
  }
  showPiChart() {
    this.$pi.checked = true
    this.piChartView.show()
    this.barChartView.hide()
    this.setCheckboxLabel(this.$pi.id, true)
    this.setCheckboxLabel(this.$bar.id, false)
  }
  setCheckboxLabel(checkBoxId: string, isShow: boolean) {
    const $label = this.query(`[for='${checkBoxId}']`)
    console.log($label)
    const $showIcon = $label.querySelector(`.${CHART_CLASS.SHOW_ICON}`)
    const $hideIcon = $label.querySelector(`.${CHART_CLASS.HIDE_ICON}`)

    if (isShow) {
      $showIcon.classList.remove(CLASS.HIDDEN)
      $hideIcon.classList.add(CLASS.HIDDEN)
      return
    }
    $showIcon.classList.add(CLASS.HIDDEN)
    $hideIcon.classList.remove(CLASS.HIDDEN)
  }
  clear() {
    this.showBarChart()
  }
  mount(): void {
    this.$bar = <HTMLInputElement>this.query('#bar')
    this.$pi = <HTMLInputElement>this.query('#pi')
    this.piChartView = new PiChartView()
    this.barChartView = new BarChartView()
  }
}
