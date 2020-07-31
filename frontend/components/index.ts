import { View } from '../view'

export class Component<T extends View> {
  view: T
  parent
  constructor(parent, view: T) {
    this.parent = parent as Component<View>
    this.view = view
  }
  mount(element: HTMLElement) {
    this.view.appendToElement(element)
  }
}
