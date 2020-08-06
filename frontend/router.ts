import { Observable } from './model'
import store from './model/store'
import { GLOBAL, ROUTE, ROUTER, ROUTES } from './utils/constants'

class Router extends Observable {
  url: URL
  year: number = new Date().getFullYear()
  month: number = new Date().getMonth() + 1
  beforePath: string
  routes: Set<string> = new Set(ROUTES.ALL)
  constructor() {
    super()
    store.on(GLOBAL.LOGIN, () => {
      this.go(ROUTE.LIST)
    })
    store.on(GLOBAL.LOGOUT, () => {
      this.go(ROUTE.LOGIN)
    })

    document.body.addEventListener(
      'click',
      this.bindAnchorNavigateHandler.bind(this)
    )
    window.onpopstate = this.onPopState.bind(this)
  }
  bindAnchorNavigateHandler({ target: $target }) {
    if (!($target instanceof HTMLAnchorElement)) return
    const path = $target.getAttribute('to')
    if (path === ROUTE.PREVIOUS_MONTH) {
      this.movePreviousMonth()
      this.pushURL()
      return
    }
    if (path === ROUTE.NEXT_MONTH) {
      this.moveNextMonth()
      this.pushURL()
      return
    }
    this.go(path)
  }

  onPopState(event) {
    const { state } = event
    const { path, year, month } = state
    if (path !== ROUTE.LOGIN) {
      this.year = year
      this.month = month
      this.commitDateChange()
    }
    this.go(path, true)
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
    if (!store.token) {
      this.go(ROUTE.LOGIN)
      return
    }
    if (path === '') this.go(ROUTE.LIST)
if (this.isInvalidPath(path)) return
 this.go(path)
  }
  commitDateChange() {
    this.emit(ROUTER.CHANGE_DATE, { year: this.year, month: this.month })
  }
  pushURL() {
    const { beforePath, year, month } = this
    if (beforePath === ROUTE.LOGIN) {
      history.pushState({ path: ROUTE.LOGIN }, '', ROUTE.LOGIN)
      return
    }
    const params = `year=${year}&month=${month}`
    history.pushState(
      { path: beforePath, year, month },
      '',
      `${beforePath}?${params}`
    )
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
    return !this.routes.has(path)
  }
  go(path, fromPopState = false) {
    const isFirstNavigation = this.beforePath === undefined
    if (path === null) return
    if (this.beforePath !== path) {
      if (this.isInvalidPath(path)) return
      if (!isFirstNavigation) {
        this.emit(ROUTER.MUTATE_VIEW, {
          path: this.beforePath,
          flag: false,
        })
      }

      if (
        this.beforePath === ROUTE.LOGIN ||
        (isFirstNavigation && path !== ROUTE.LOGIN)
      ) {
        this.commitDateChange()
      }
      this.emit(ROUTER.MUTATE_VIEW, {
        path,
        flag: true,
      })
      this.beforePath = path
    }
    if (!fromPopState) this.pushURL()
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
