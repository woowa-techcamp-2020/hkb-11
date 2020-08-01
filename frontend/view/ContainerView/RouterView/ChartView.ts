import { View } from '../../index'

const template = `
  <section id='invoice-chart'>
    <div>
      차트입니당!
    </div>
  </section>
`

export default class ChartView extends View {
  constructor() {
    super(template)
  }
  mount(): void {}
}
