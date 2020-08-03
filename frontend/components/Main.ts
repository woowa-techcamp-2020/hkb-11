import { Component } from '.'
import router from '../router'
import { ROUTER } from '../utils/constants'
import MainView from '../view/MainView'
import NavigationView from '../view/MainView/NavigatorView'
export class Main extends Component<MainView> {
  navigationView: NavigationView
  constructor(view) {
    super(null, view)
    router.on(ROUTER.CHANGE_DATE, ({ year, month }) => {
      this.navigationView.setDate(year, month)
    })
    this.navigationView = this.view.navigatorView
  }
}
