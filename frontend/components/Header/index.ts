import store from '../../model/store'
import router from '../../router'
import { GLOBAL, ROUTER } from '../../utils/constants'
import { Component } from '../component'
import { Login } from '../Login'
import { Navigator } from '../Navigator'
import HeaderView from './view'

export class Header extends Component<HeaderView> {
  login: Login
  navigator: Navigator

  constructor(parent, view) {
    super(parent, view)

    this.login = new Login(this, this.view.loginView)
    this.navigator = new Navigator(this, this.view.navigatorView)
    this.view.navigatorView.appendToView(this.view)

    router.add('login', [this.login])
    store.on(GLOBAL.LOGIN, () => {
      this.view.login()
    })
    store.on(GLOBAL.LOGOUT, () => {
      this.view.logout()
    })
    router.on(ROUTER.CHANGE_DATE, ({ year, month }) => {
      this.view.navigatorView.setDate(year, month)
    })
    router.on(ROUTER.MUTATE_VIEW, ({ path, flag }) => {
      if (path !== 'login') return
      if (flag) {
        this.view.navigatorView.remove()
        this.view.loginView.appendToView(this.view)
        return
      }
      this.view.loginView.remove()
      this.view.navigatorView.appendToView(this.view)
    })
  }
}
