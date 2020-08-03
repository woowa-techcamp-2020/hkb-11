import { View } from '../../index'
import './style.scss'
import { template } from './template'

export default class NavigatorView extends View {
  $month: HTMLDivElement
  constructor() {
    super(template)
  }
  mount(): void {
    this.$month = <HTMLDivElement>this.query('.month')
  }
  setDate(year, month) {
    let str = ``
    if (year != new Date().getFullYear()) {
      str += `${year}년 `
    }
    str += `${month}월`
    this.$month.innerText = str
  }
}
