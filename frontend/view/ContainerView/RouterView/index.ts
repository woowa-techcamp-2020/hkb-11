import { View } from '../../index'
import CalendarView from './CalendarView'
import ChartView from './ChartView'
import FilterView from './FilterView'
import FormView from './FormView'
import ListView from './ListView'
import './style.scss'
import { template } from './template'

export default class RouterView extends View {
  formView: FormView
  filterView: FilterView
  listView: ListView
  calendarView: CalendarView
  chartView: ChartView

  constructor() {
    super(template)

    this.formView = new FormView()
    this.filterView = new FilterView()
    this.listView = new ListView()
    this.calendarView = new CalendarView()
    this.chartView = new ChartView()
  }
  mount(): void {}
}
