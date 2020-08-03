import { templateToElement } from '../../../../utils/ElementGenerator'
import { View } from '../../../index'
import './style.scss'
import { barChartTemplate, piChartTemplate, template } from './template'

export default class ChartView extends View {
  $bar: HTMLInputElement
  $pi: HTMLInputElement
  $barChart: SVGElement
  $piChart: SVGElement
  constructor() {
    super(template)
    this.$element.appendChild(templateToElement(barChartTemplate))
    this.$element.appendChild(templateToElement(piChartTemplate))

    this.$barChart = <SVGElement>this.query('#bar-chart')
    this.$piChart = <SVGElement>this.query('#pi-chart')
    console.log(this.$barChart, this.$piChart)
    this.$element.addEventListener('click', ({ target }) => {
      if (!(target instanceof HTMLInputElement)) return
      console.log(target)
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
    this.$barChart.classList.remove('hidden')
    this.$piChart.classList.add('hidden')
  }
  showPiChart() {
    this.$pi.checked = true
    this.$barChart.classList.add('hidden')
    this.$piChart.classList.remove('hidden')
  }
  clear() {
    this.showBarChart()
  }
  mount(): void {
    this.$bar = <HTMLInputElement>this.query('#bar')
    this.$pi = <HTMLInputElement>this.query('#pi')
  }
}
