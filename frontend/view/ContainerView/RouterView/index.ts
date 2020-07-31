import { View } from '../../index'
import FilterView from './FilterView'
import FormVIew from './FormView'
import ListView from './ListView'

export default class RouterView extends View {
  formView: FormVIew
  filterView: FilterView
  listView: ListView
  constructor() {
    super('router-content', 'div')
  }
  mount() {
    this.formView = new FormVIew()
    this.filterView = new FilterView()
    this.listView = new ListView()
    this.formView.appendToView(this)
    this.filterView.appendToView(this)
    this.listView.appendToView(this)
  }
}
