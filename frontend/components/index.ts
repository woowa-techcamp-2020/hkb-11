import { MainState, Observable } from '../store'
import { AdderView, InvoiceListView, MainView, View } from '../view'

export class Component<S extends Observable, T extends View> {
  state: S
  view: T
  constructor(state, view) {
    this.state = state
    this.view = view
  }
}
export class MainComponent extends Component<MainState, MainView> {
  adderView: AdderView
  listView: InvoiceListView
  constructor(state, view) {
    super(state, view)
    this.view.appendToElement(document.querySelector('div'))
    this.adderView = this.view.adderView
    this.listView = this.view.listView

    this.adderView.bindAddButtonHandler(() => {
      console.log('add')
      const { id, content } = this.adderView.getForm()
      this.state.addItem({ id, content })
      this.adderView.clearForm()
    })
    this.adderView.bindClearButtonHandler(() => {
      console.log('clear')
      this.state.clearItem()
    })
    this.state.on('ADD_ITEM', (item) => {
      const { id, content } = item
      this.listView.addList(id, content)
    })
    this.state.on('CLEAR_ITEM', () => {
      this.listView.clear()
    })
  }
}
