import { Observable } from './model'
import { ROUTER_EVENTS as ROUTER } from './utils/constants'

class Router extends Observable {
  url: URL
  currentPath: string
  constructor() {
    super()
  }
  getURL() {
    this.url = new URL(window.location.href)
  }
  fetchURL() {
    this.getURL()
    if (this.url.pathname === '' || this.url.pathname === '/') {
      this.go('list')
    }
    // do parse and emit proper event
  }
  go(path) {
    console.log(`${this.currentPath} >> ${path}`)
    if (this.currentPath === path) return
    if (!path) return
    history.pushState({}, '', path)
    this.emit(ROUTER.GO, path)
    this.emit(`${ROUTER.GO}-${this.currentPath}`, false)
    this.emit(`${ROUTER.GO}-${path}`, true)
    this.currentPath = path
  }
}

const router = new Router()

export default router
