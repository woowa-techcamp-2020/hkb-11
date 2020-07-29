function createElement(tag: string, className?: string): HTMLDivElement {
  const element: HTMLDivElement = document.createElement('div')
  if (className) element.classList.add(className)
  return element
}

export abstract class View {
  $element: HTMLElement
  constructor() {
    this.$element = createElement('div')
    this.$element.innerHTML = this.init()
    this.mount()
  }
  appendToElement($element: HTMLElement) {
    $element.appendChild(this.$element)
  }
  appendToView(view: View) {
    this.appendToElement(view.$element)
  }
  query(query: string) {
    return this.$element.querySelector(query)
  }
  clear() {
    this.$element.innerHTML = ''
  }
  abstract mount(): void
  init() {
    return ''
  }
}

export class AdderView extends View {
  $id: HTMLInputElement
  $content: HTMLInputElement
  $addButton: HTMLButtonElement
  $clearButton: HTMLButtonElement
  init() {
    return `
      <div> 
        <input id="id">
        <input id="content">
      </div>
      <div>
        <button id="add">추가</button>
        <button id="clear">다지워!!</button>
      </div>
    `
  }
  clearForm() {
    this.$id.value = ''
    this.$content.value = ''
  }
  getForm() {
    return {
      id: this.$id.value,
      content: this.$content.value,
    }
  }
  bindAddButtonHandler(handler) {
    this.$addButton.addEventListener('click', handler)
  }
  bindClearButtonHandler(handler) {
    this.$clearButton.addEventListener('click', handler)
  }
  mount() {
    this.$id = this.query('#id') as HTMLInputElement
    this.$content = this.query('#content') as HTMLInputElement
    this.$addButton = this.query('#add') as HTMLButtonElement
    this.$clearButton = this.query('#clear') as HTMLButtonElement
  }
}

export class InvoiceListView extends View {
  $id: HTMLSpanElement
  $content: HTMLSpanElement
  addList(id: string, content: string) {
    const item = createElement('div', 'item')
    item.innerHTML = `
      <span id="id"></span>
      <span id="content"></span>
    `
    const $id: HTMLSpanElement = item.querySelector('#id')
    $id.innerText = id
    const $content: HTMLSpanElement = item.querySelector('#content')
    $content.innerText = content
    this.$element.appendChild(item)
  }
  mount() {
    this.$id = this.query('#id') as HTMLSpanElement
    this.$content = this.query('#content') as HTMLSpanElement
  }
  setValue(id: string, content: string) {
    this.$id.innerText = id
    this.$content.innerText = content
  }
}

export class MainView extends View {
  adderView: AdderView
  listView: InvoiceListView
  mount() {
    this.adderView = new AdderView()
    this.listView = new InvoiceListView()
    this.adderView.appendToView(this)
    this.listView.appendToView(this)
  }
}
