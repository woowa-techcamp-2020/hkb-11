import { Component } from './components'
import { Observable } from './model'
import { ROUTER_EVENT } from './utils/constants'
import { View } from './view'

class Router extends Observable {
  url: URL
  currentPath: string
  components: Map<string, Component<View>[]>
  constructor() {
    super()
    this.components = new Map<string, Component<View>[]>()
  }
  add(path: string, components: Component<View>[]) {
    this.components[path] = components
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
    if (!Object.keys(this.components).includes(path)) return

    history.pushState({}, '', path)
    this.emit(ROUTER_EVENT.GO, path)
    if (this.currentPath)
      this.emit(ROUTER_EVENT.MUTATE_VIEW, {
        path: this.currentPath,
        flag: false,
        components: this.components[this.currentPath],
      })
    this.emit(ROUTER_EVENT.MUTATE_VIEW, {
      path,
      flag: true,
      components: this.components[path],
    })
    this.currentPath = path
    return this.components[path]
  }
}

const router = new Router()

export default router
