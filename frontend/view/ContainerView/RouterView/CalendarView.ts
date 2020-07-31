import { View } from '../../index'

export default class CalendarView extends View {
  constructor() {
    super('invoice-calendar', 'section')
  }
  mount(): void {}
  init() {
    return `
      <div class="rows">
      </div>
    `
  }
}
