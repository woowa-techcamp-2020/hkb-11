import { View } from '../../index'
import CalendarView from './CalendarView'
import ChartView from './ChartView'
import FilterView from './FilterView'
import FormVIew from './FormView'
import ListView from './ListView'

export default class RouterView extends View {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  calendarView: CalendarView
  chartView: ChartView

  constructor() {
    super('router-content', 'div')
  }

  mount() {
    // TEMP : mount by route
    const route = ''
    if (route === '') {
      this.mountList()
    } else if (route === 'calendar') {
      this.mountCalendar()
    } else if (route === 'chart') {
      this.mountCalendar()
    }
  }

  mountList() {
    this.formView = new FormVIew()
    this.filterView = new FilterView()
    this.listView = new ListView()
    this.formView.appendToView(this)
    this.filterView.appendToView(this)
    this.listView.appendToView(this)
  }

  mountCalendar() {
    this.calendarView = new CalendarView()
  }

  mountChart() {
    this.chartView = new ChartView()
  }
}
