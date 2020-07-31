import { View } from '../view'

export class Component<T extends View, G extends Component<View, any> = any> {
  view: T
  parent: G
  constructor(parent, view: T) {
    this.parent = parent as G
    this.view = view
  }
  mount(element: HTMLElement) {
    this.view.appendToElement(element)
  }
}
