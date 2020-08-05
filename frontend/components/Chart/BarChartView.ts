import router from '../../router'
import { createSVGCircle, createSVGLine, createSVGText, View } from '../view'
import config from './config'
import { barChartTemplate } from './template'
export class BarChartView extends View {
  $barChart: SVGElement

  constructor() {
    super(barChartTemplate)
    this.$barChart = <SVGElement>this.query('#bar-chart svg')
    this.initBarChart()
  }
  mount() {}
  insertBarChartTemplate(...templates: string[]) {
    templates.forEach((template) => {
      this.$barChart.insertAdjacentHTML('beforeend', template)
    })
  }
  setBarMaxHeight(height) {
    const { lines } = config
    for (let i = 0; i < lines; i++) {
      const text = <SVGTextElement>this.$barChart.querySelector(`text#h${i}`)
      text.textContent = String(Math.floor((height / (lines - 1)) * i))
    }
  }
  setBarHeight(date, ratio) {
    const { paddingY, height, lineHeight } = config
    const circle = <SVGCircleElement>this.$barChart.querySelector(`#c${date}`)
    const line = <SVGLineElement>this.$barChart.querySelector(`#l${date}`)
    const beforeLine = <SVGLineElement>(
      this.$barChart.querySelector(`#l${parseInt(date) - 1}`)
    )
    const y = height - paddingY - (height - 2 * paddingY - lineHeight) * ratio
    if (line) {
      line.setAttribute('y1', `${y}`)
    }
    if (beforeLine) {
      beforeLine.setAttribute('y2', `${y}`)
    }
    circle.setAttribute('cy', `${y}`)
  }
  renderBarChart(arr) {
    this.initBarChart()
    const maxAmount = Math.max(...(<number[]>Object.values(arr)))
    if (maxAmount == 0) return
    const maxHeight = 1.5 * maxAmount - ((1.5 * maxAmount) % 1000)
    this.setBarMaxHeight(maxHeight)
    Object.entries(arr).forEach(([date, amount]: [string, number]) => {
      this.setBarHeight(date, amount / maxHeight)
    })
  }
  initBarChart() {
    this.$barChart.innerHTML = ''
    const {
      height,
      width,
      paddingX,
      paddingX2,
      paddingY,
      lines,
      lineHeight,
    } = config
    const dayN = new Date(router.year, router.month, 0).getDate()
    for (let i = 1; i <= lines; i++) {
      const y = paddingY + lineHeight * i
      this.insertBarChartTemplate(
        createSVGLine({
          className: 'grid-line',
          x1: paddingX,
          x2: width - paddingX,
          y1: y,
          y2: y,
        }),
        createSVGText({
          className: 'grid-number',
          id: `h${lines - i}`,
          x: paddingX - paddingX2,
          y: y + 6,
        })
      )
    }
    const padding = paddingX + paddingX2
    const offsetX = (width - padding * 2) / dayN
    for (let i = 1; i <= dayN; i++) {
      const x = padding + offsetX * i
      const y = height - paddingY
      this.insertBarChartTemplate(
        i !== 1
          ? createSVGLine({
              className: 'connection-line',
              id: `l${i - 1}`,
              x1: x - offsetX,
              x2: x,
              y1: y,
              y2: y,
            })
          : '',
        createSVGCircle({
          id: `c${i}`,
          className: 'date-circle',
          cx: x,
          cy: y,
        }),
        createSVGText({
          className: 'date-number',
          id: `d${i}`,
          x,
          y: height - paddingY + paddingX2,
          text: i,
        })
      )
    }
  }
}
