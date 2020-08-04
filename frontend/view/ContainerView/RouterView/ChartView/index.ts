import router from '../../../../router'
import { templateToElement } from '../../../../utils/ElementGenerator'
import { View } from '../../../index'
import config from './config'
import './style.scss'
import { barChartTemplate, piChartTemplate, template } from './template'
class PathBuilder {
  d: string = ''
  cx: 0
  cy: 0
  r: 0
  constructor(cx, cy, r) {
    this.cx = cx
    this.cy = cy
    this.r = r
  }
  dx(ang) {
    return this.r * Math.cos(((ang - 90) / 180) * Math.PI)
  }
  dy(ang) {
    return this.r * Math.sin(((ang - 90) / 180) * Math.PI)
  }
  start(ang) {
    return this.c().move(this.cx + this.dx(ang), this.cy + this.dy(ang))
  }
  end(ang) {
    return this.arc(ang)
  }
  move(x, y) {
    this.d += `M${x} ${y} `
    return this
  }
  arc(ang) {
    this.d += `A${this.r} ${this.r} 0 ${ang >= 180 ? 1 : 0} 1 ${
      this.cx + this.dx(ang)
    } ${this.cy + this.dy(ang)} `
    this.d += `L${this.cx} ${this.cy} Z`
    return this
  }
  c() {
    this.d = ''
    return this
  }
}
export default class ChartView extends View {
  $bar: HTMLInputElement
  $pi: HTMLInputElement
  $barFragment: HTMLDivElement
  $piFragment: HTMLDivElement
  $barChart: SVGElement
  $piChart: SVGElement
  constructor() {
    super(template)
    this.$element.appendChild(templateToElement(barChartTemplate))
    this.$element.appendChild(templateToElement(piChartTemplate))
    this.$barFragment = <HTMLDivElement>this.query('#bar-chart')
    this.$piFragment = <HTMLDivElement>this.query('#pi-chart')
    this.$barChart = <SVGElement>this.query('#bar-chart svg')
    this.$piChart = <SVGElement>this.query('#pi-chart svg')
    console.log(this.$barChart, this.$piChart)
    this.initBarChart()
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
  renderBarChart(arr) {
    this.initBarChart()
    const maxAmount = Math.max(...(<number[]>Object.values(arr)))
    if (maxAmount == 0) return
    const maxHeight = 1.5 * maxAmount
    this.setBarMaxHeight(maxHeight)
    Object.entries(arr).forEach(([date, amount]: [string, number]) => {
      this.setBarHeight(date, amount / maxHeight)
    })
  }
  initBarChart() {
    this.$barChart.innerHTML = ''
    const { height, width, paddingX, paddingX2, paddingY, lines } = config
    const dayN = new Date(router.year, router.month, 0).getDate()
    for (let i = 1; i <= lines; i++) {
      const y = paddingY + ((height - 2 * paddingY) / lines) * i
      this.$barChart.insertAdjacentHTML(
        'beforeend',
        `<line x1="${paddingX}" y1="${y}" x2="${
          width - paddingX
        }" y2="${y}" class="grid" stroke="lightgrey" stroke-width="1"></line>`
      )
      this.$barChart.insertAdjacentHTML(
        'beforeend',
        `<text id="h${
          lines - i
        }" vertical-align="center" text-anchor="end" x="${
          paddingX - paddingX2
        }" y="${y + 6}" font-size="14">${lines - i}</text>`
      )
    }
    for (let i = 1; i <= dayN; i++) {
      const padding = paddingX + paddingX2
      const x = padding + ((width - padding * 2) / dayN) * i
      this.$barChart.insertAdjacentHTML(
        'beforeend',
        `<circle id="c${i}" cx="${x}" cy="${
          height - paddingY
        }" r="${3}" stroke-width="1"></circle>`
      )
      this.$barChart.insertAdjacentHTML(
        'beforeend',
        `<text text-anchor="middle" x="${x}" y="${
          height - paddingY + paddingX2
        }" font-size="${10}" stroke-width="1">${i}</text>`
      )
    }
  }
  renderPiChart(arr) {
    this.$piChart.innerHTML = ''
    const { height, width, circles, radius: r, circleColors } = config
    const p = new PathBuilder(width / 2, height / 2, r)
    let ang = 0
    arr.splice(0, circles).forEach(({ title, value, ang: theta }, idx) => {
      this.$piChart.insertAdjacentHTML(
        'beforeend',
        `<path d="${
          p
            .c()
            .start(ang)
            .end(ang + theta - 0.1).d
        }" stroke="2" fill="${circleColors[idx]}"></path>`
      )
      ang += theta
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
    circle.setAttribute(
      'cy',
      String(height - paddingY - (height - 2 * paddingY - lineHeight) * ratio)
    )
    // padding Y   ~   height-paddingY
  }
  showBarChart() {
    this.$bar.checked = true
    this.$barFragment.classList.remove('hidden')
    this.$piFragment.classList.add('hidden')
  }
  showPiChart() {
    this.$pi.checked = true
    this.$barFragment.classList.add('hidden')
    this.$piFragment.classList.remove('hidden')
  }
  clear() {
    this.showBarChart()
  }
  mount(): void {
    this.$bar = <HTMLInputElement>this.query('#bar')
    this.$pi = <HTMLInputElement>this.query('#pi')
  }
}
