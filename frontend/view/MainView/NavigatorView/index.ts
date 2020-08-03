import { View } from '../../index'
import './style.scss'
import { template } from './template'

export default class NavigatorView extends View {
  handlers: Function[]
  constructor() {
    super(template)
  }
  bindRouterChangedHandler(handler) {
    this.$element.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) {
        const { nodeName } = target
        if (!(nodeName === 'A')) return
        const to = target.getAttribute('to')
        if (!to) return
        handler(to)
      }
    })
  }
  mount(): void {}
}
