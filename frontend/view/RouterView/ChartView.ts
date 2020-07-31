import { View } from '../index'

export default class ChartView extends View {
  constructor() {
    super('invoice-chart', 'section')
  }
  mount(): void {}
  init() {
    return `
      <div>
        차트입니당!
      </div>
    `
  }
}
