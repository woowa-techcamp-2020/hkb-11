import { View } from './index'

export default class NavigatorView extends View {
  constructor() {
    super('navigator', 'section')
  }
  mount(): void {}
  init() {
    return `
      <div class="rows">
        <nav class="row month-picker">
          <a to="previous-month">←</a>
          <div class="month">6월</div>
          <a to="next-month">→</a>
        </nav>
        <nav class="row">
          <a to="list">내역</a>
          <a to="calendar">달력</a>
          <a to="chart">통계</a>
        </nav>
      </div>
    `
  }
}
