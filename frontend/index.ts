import { App, AppView } from './components/app'
import router from './router'
import './static/index.html'
import './static/styles/base.scss'
const body = document.body
const app = new App(new AppView())

app.mount(body)
router.parseURL()
