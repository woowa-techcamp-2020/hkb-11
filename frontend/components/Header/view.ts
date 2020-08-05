import LoginView from '../Login/view'
import NavigatorView from '../Navigator/view'
import { View } from '../view'
import './style.scss'
import { template } from './template'

export default class HeaderView extends View {
  loginView: LoginView
  navigatorView: NavigatorView
  $buttonPaymentModal: HTMLButtonElement

  constructor() {
    super(template)
  }

  mount(): void {
    this.loginView = new LoginView()
    this.navigatorView = new NavigatorView()

    this.$buttonPaymentModal = <HTMLButtonElement>(
      this.query('.button-payment-modal')
    )
  }
}
