import { Observable } from '../model'
import { View } from '../view'

export class Component<T extends View, S extends Observable> {
  view: T
  model: S
  constructor(view: T, model?: S) {
    if (model) this.model = model
    this.view = view
  }
  mount(element: HTMLElement) {
    this.view.appendToElement(element)
  }
}
