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
  parseURL() {
    this.getURL()
    const path = this.url.pathname.substr(1)
    const year = parseInt(this.url.searchParams.get('year'))
    const month = parseInt(this.url.searchParams.get('month'))

    if (!(this.year === year && this.month === month) && year && month) {
      this.year = year
      this.month = month
    }
    this.commitDateChange()
    if (path === '') {
      this.go('list')
      return
    }
    if (!this.isInvalidPath(path)) this.go(path)
  }
  commitDateChange() {
    this.emit(ROUTER.CHANGE_DATE, { year: this.year, month: this.month })
  }
  renderURL() {
    const { currentPath, year, month } = this
    if (currentPath === 'login') {
      history.pushState({}, '', 'login')
      return
    }
    const params = `year=${year}&month=${month}`
    history.pushState({}, '', `${currentPath}?${params}`)
  }
  movePreviousMonth() {
    if (this.month == 1) {
      this.year -= 1
      this.month = 12
    } else this.month -= 1
    this.commitDateChange()
  }
  moveNextMonth() {
    if (this.month == 12) {
      this.year += 1
      this.month = 1
    } else this.month += 1
    this.commitDateChange()
  }
  isInvalidPath(path) {
    return !Object.keys(this.components).includes(path)
  }
  go(path) {
    console.log(`${this.currentPath} >> ${path}`)
    if (path === 'previous-month') {
      this.movePreviousMonth()
    } else if (path === 'next-month') {
      this.moveNextMonth()
    } else if (this.currentPath !== path) {
      if (this.isInvalidPath(path)) return
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
    }
    this.renderURL()
    return this.components[path]
  }

  getYear() {
    return this.year
  }
  getMonth() {
    return this.month
  }
}

const router = new Router()

export default router
