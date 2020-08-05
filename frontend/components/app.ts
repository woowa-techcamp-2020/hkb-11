import { PaymentModel } from '../model/PaymentModel'
import { Component } from './component'
import { Container } from './Container'
import ContainerView from './Container/view'
import { Header } from './Header'
import { default as HeaderView } from './Header/view'
import { Modal } from './Modal'
import ModalView from './Modal/view'
import { View } from './view'

const template: string = `<div></div>`

export class AppView extends View {
  modalView: ModalView
  headerView: HeaderView
  containerView: ContainerView

  constructor() {
    super(template)
  }

  mount(): void {
    this.modalView = new ModalView()
    this.headerView = new HeaderView()
    this.containerView = new ContainerView()

    this.modalView.appendToView(this)
    this.headerView.appendToView(this)
    this.containerView.appendToView(this)
  }
}

export class App extends Component<AppView> {
  paymentModel: PaymentModel
  header: Header
  modal: Modal
  container: Container

  constructor(view: AppView) {
    super(null, view)

    // set models
    this.paymentModel = new PaymentModel()

    // set child components
    this.header = new Header(this, this.view.headerView)
    this.modal = new Modal(this, this.view.modalView)
    this.container = new Container(this, this.view.containerView)
  }
}
