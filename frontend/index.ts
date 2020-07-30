import { Container } from './components/Container'
import { Main } from './components/Main'
import { InvoiceModel } from './model/InvoiceModel'
import MainView from './view/MainView'
import RouterView from './view/RouterView'
import './static/index.html'
import './static/styles/base.scss'

const body = document.body
const main = new Main(new MainView())
const container = new Container(new RouterView(), new InvoiceModel())

main.mount(body)
container.mount(body)
