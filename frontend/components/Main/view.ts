import HeaderView from '../Header/view'
import ModalView from '../Modal/view'
import NavigatorView from '../Navigator/view'
import { View } from '../view'
import './style.scss'
import { template } from './template'

export default class MainView extends View {
  headerView: HeaderView
  modalView: ModalView
  navigatorView: NavigatorView
  constructor() {
    super(template)
  }
  mount(): void {
    this.headerView = new HeaderView()
    this.navigatorView = new NavigatorView()
    this.modalView = new ModalView()

    this.headerView.appendToView(this)
    this.modalView.appendToView(this)
    this.navigatorView.appendToView(this)
  }
}
