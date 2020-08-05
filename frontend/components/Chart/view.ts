import router from '../../router'
import { templateToElement } from '../../utils/ElementGenerator'
import { setText, View } from '../view'
import config from './config'
import './style.scss'
import {
  barChartTemplate,
  piChartTemplate,
  piItemTemplate,
  template,
} from './template'
function dx(r, ang) {
  return r * Math.cos(((ang - 90) / 180) * Math.PI)
}
function dy(r, ang) {
  return r * Math.sin(((ang - 90) / 180) * Math.PI)
}
function createGridLine({ x1, x2, y }) {
  return `<line class="grid-line" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}"></line>`
}
function createGridNumber({ id, x, y }) {
  return `<text class="grid-number" id="${id}" x="${x}" y="${y}"></text>`
}

function createDateCircle({ id, cx, cy }) {
  return `<circle class="date-circle" id="${id}" cx="${cx}" cy="${cy}"></circle>`
}
function createDateNumber({ id, x, y, date }) {
  return `<text class="date-number" id="${id}" x=${x} y="${y}">${date}</text>`
}
function createConnectionLine({ id, x1, x2, y }) {
  return `<line class="connection-line" id="${id}" x1="${x1}" x2="${x2}" y1="${y}" y2="${y}"></line>`
}
function createPiTableItemElement({ title, ratio, amount, idx }) {
  const { circleColors, width } = config
  const $piTableItem = templateToElement(piItemTemplate)
  setText($piTableItem, '.item-title', title)
  const $itemColorBar = $piTableItem.querySelector('.item-color-bar')
  $itemColorBar.setAttribute(
    'style',
    `width: ${ratio * width}px; background-color: ${circleColors[idx]}`
  )
  setText($piTableItem, '.item-amount', amount)
  return $piTableItem
}

function signed(ang) {
  return ang >= 180 ? -1 : 1
}
function createPiIndicatorLine({ ang, title }) {
  const { cx, cy, piLineRatio: ratio, radius: r } = config

  const ix = cx + dx(r * ratio, ang),
    iy = cy + dy(r * ratio, ang)
  const jx = ix + signed(ang) * (ratio - 1) * r

  return `<line x1="${cx}" y1="${cy}" x2="${ix}" y2="${iy}" stroke="black"></line>
  <line x1="${ix}" y1="${iy}" x2="${jx}" y2="${iy}" stroke="black"></line>
  <text x="${jx + signed(ang) * 6}" y="${iy + 4}" text-anchor="${
    signed(ang) == 1 ? 'start' : 'end'
  }">${title}</text>`
}
function createPiArc({ ang, theta, idx }) {
  const { cx, cy, circleColors, radius: r } = config
  return `<path d="M ${cx + dx(r, ang)} ${cy + dy(r, ang)} A ${r} ${r} 0 ${
    theta >= 180 ? 1 : 0
  } 1 ${cx + dx(r, ang + theta)} ${
    cy + dy(r, ang + theta)
  } L ${cx} ${cy} Z" stroke="2" fill="${circleColors[idx]}"></path>`
}
export default class ChartView extends View {
  $bar: HTMLInputElement
  $pi: HTMLInputElement
  $piTable: HTMLDivElement
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
    this.$piTable = <HTMLDivElement>this.query('#pi-table')
    this.initBarChart()
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
  insertBarChartTemplate(...templates: string[]) {
    templates.forEach((template) => {
      this.$barChart.insertAdjacentHTML('beforeend', template)
    })
  }
  insertPiChartTemplate(...templates: string[]) {
    templates.forEach((template) => {
      this.$piChart.insertAdjacentHTML('beforeend', template)
    })
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
        createGridLine({
          x1: paddingX,
          x2: width - paddingX,
          y,
        }),
        createGridNumber({
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
        createDateCircle({
          id: `c${i}`,
          cx: x,
          cy: y,
        }),
        createDateNumber({
          id: `d${i}`,
          x,
          y: height - paddingY + paddingX2,
          date: i,
        }),
        i !== 1
          ? createConnectionLine({
              id: `l${i - 1}`,
              x1: x - offsetX,
              x2: x,
              y,
            })
          : ''
      )
    }
  }
  renderPiChart(arr) {
    this.$piChart.innerHTML = ''
    const { circles } = config
    let ang = 0
    arr.slice(0, circles).forEach(({ title, ang: theta }, idx) => {
      this.insertPiChartTemplate(
        createPiIndicatorLine({ ang: ang + theta / 2, title }),
        createPiArc({ ang, theta, idx })
      )
      ang += theta
    })
    this.renderPiTable(arr)
  }
  renderPiTable(arr) {
    const { circles } = config
    this.$piTable.innerHTML = ''
    const totalAmount = arr.reduce((a, b) => a + b.amount, 0)
    arr.slice(0, circles).forEach(({ title, amount }, idx) => {
      this.$piTable.appendChild(
        createPiTableItemElement({
          title,
          ratio: amount / totalAmount,
          idx,
          amount,
        })
      )
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
