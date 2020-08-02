import { View } from '../../../index'
import './style.scss'
import { template } from './template'

export default class CalendarView extends View {
  constructor() {
    super(template)
  }
  mount(): void {}
}
