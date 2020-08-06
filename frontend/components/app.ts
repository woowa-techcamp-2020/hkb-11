import { Component } from '.'
import { PaymentModel } from '../model/PaymentModel'
import router from '../router'
import { ROUTE, ROUTER } from '../utils/constants'
import { Container } from './Container'
import ContainerView from './Container/view'
import { Header } from './Header'
import { default as HeaderView } from './Header/view'
import { Login } from './Login'
import LoginView from './Login/view'
import { Modal } from './Modal'
import ModalView from './Modal/view'
import { View } from './view'

const template: string = `<div id="app"></div>`

export class AppView extends View {
  modalView: ModalView
  headerView: HeaderView
  containerView: ContainerView
  loginView: LoginView

  constructor() {
    super(template)
  }

  mount(): void {
    this.modalView = new ModalView()
    this.headerView = new HeaderView()
    this.containerView = new ContainerView()
    this.loginView = new LoginView()

    this.modalView.appendToView(this)
    this.containerView.appendToView(this)
  }
}

export class App extends Component<AppView> {
  paymentModel: PaymentModel
  header: Header
  modal: Modal
  container: Container
  login: Login

  constructor(view: AppView) {
    super(null, view)

    this.paymentModel = new PaymentModel()

    this.header = new Header(this, this.view.headerView)
    this.modal = new Modal(this, this.view.modalView)
    this.container = new Container(this, this.view.containerView)
    this.login = new Login(this, this.view.loginView)

    router.on(ROUTER.MUTATE_VIEW, ({ path, flag }) => {
      if (path === ROUTE.LOGIN && flag) {
        this.header.view.remove()
        this.login.view.appendToView(this.view)
        return
      }
      if (!this.header.view.isAttached()) {
        this.login.view.remove()
        this.header.view.prependToView(this.view)
      }
    })

    // set child components
  }
}
