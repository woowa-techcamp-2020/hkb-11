import { Container } from './components/Container/index'
import RouterView from './components/Container/view'
import { Main } from './components/Main'
import MainView from './components/Main/view'
import router from './router'
import './static/index.html'
import './static/styles/base.scss'
const body = document.body
const main = new Main(new MainView())
const container = new Container(new RouterView())

main.mount(body)
container.mount(body)
router.parseURL()
