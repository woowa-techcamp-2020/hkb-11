import { View } from '../../index'

const tempalte = `
  <section id='invoice-calendar'>
    <div class="rows">
    </div>
  </section>
`

export default class CalendarView extends View {
  constructor() {
    super(tempalte)
  }
  mount(): void {}
}
