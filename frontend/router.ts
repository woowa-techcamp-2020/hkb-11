import { Component } from './components'
import { Observable } from './model'
import { ROUTER } from './utils/constants'
import { View } from './view'

class Router extends Observable {
  url: URL
  year: number
  month: number
  currentPath: string
  components: Map<string, Component<View>[]>
  constructor() {
    super()
    this.components = new Map<string, Component<View>[]>()
    this.year = new Date().getFullYear()
    this.month = new Date().getMonth() + 1
    document.body.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        const { nodeName } = target
        if (!(nodeName === 'A')) return
        const to = target.getAttribute('to')
        if (!to) return
        this.go(to)
      }
    })
  }
  add(path: string, components: Component<View>[]) {
    this.components[path] = components
  }
  getURL() {
    this.url = new URL(window.location.href)
  }
  fetchURL() {
    this.getURL()
    const path = this.url.pathname.substr(1)
    const routes = Object.keys(this.components)
    if (path === '') {
      this.go('list')
      return
    }
    if (routes.includes(path)) {
      this.go(path)
    }
  }
  go(path) {
    console.log(`${this.currentPath} >> ${path}`)
    if (this.currentPath === path) return
    if (!Object.keys(this.components).includes(path)) return

    history.pushState({}, '', `${path}?year=${this.year}&month=${this.month}`)
    if (this.currentPath)
      this.emit(ROUTER.MUTATE_VIEW, {
        path: this.currentPath,
        flag: false,
        components: this.components[this.currentPath],
      })
    this.emit(ROUTER.MUTATE_VIEW, {
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
