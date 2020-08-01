import ModalView from '../ContainerView/ModalView'
import { View } from '../index'
import HeaderView from './HeaderView'
import NavigatorView from './NavigatorView'
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
