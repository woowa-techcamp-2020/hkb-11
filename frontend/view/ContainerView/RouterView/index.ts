import router from '../../../router'
import { ROUTER_EVENTS as ROUTER } from '../../../utils/constants'
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
    router.on(ROUTER.GO, (path) => {
      this.unmountViews()
      if (path === 'list') {
        this.mountList()
      }
      if (path === 'calendar') {
        this.mountCalendar()
      }
      if (path === 'chart') {
        this.mountChart()
      }
    })
  }

  mount() {
    // TEMP : mount by route
  }

  unmountViews() {
    const views = [
      this.formView,
      this.filterView,
      this.listView,
      this.calendarView,
      this.chartView,
    ]
    views.forEach((view) => {
      view.clear()
      view.remove()
    })
  }
  mountList() {
    this.formView.appendToView(this)
    this.filterView.appendToView(this)
    this.listView.appendToView(this)
  }

  mountCalendar() {
    this.filterView.appendToView(this)
    this.calendarView.appendToView(this)
  }

  mountChart() {
    this.chartView.appendToView(this)
  }
}
