import { Observable } from './model'
import { ROUTER_EVENT } from './utils/constants'
import { View } from './view'

class Router extends Observable {
  url: URL
  currentPath: string
  views: Map<string, View[]>
  constructor() {
    super()
    this.views = new Map<string, View[]>()
  }
  add(path: string, views: View[]) {
    this.views[path] = views
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
    if (!Object.keys(this.views).includes(path)) return

    history.pushState({}, '', path)
    this.emit(ROUTER_EVENT.GO, path)
    if (this.currentPath)
      this.emit(ROUTER_EVENT.MUTATE_VIEW, {
        path: this.currentPath,
        flag: false,
        views: this.views[this.currentPath],
      })
    this.emit(ROUTER_EVENT.MUTATE_VIEW, {
      path,
      flag: true,
      views: this.views[path],
    })
    this.currentPath = path
    return this.views[path]
  }
}

const router = new Router()

export default router
