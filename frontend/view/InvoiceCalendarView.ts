import { View } from './index'

export default class InvoiceCalendarView extends View {
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
