function createElement(tag: string, className?: string): HTMLDivElement {
  const element = <HTMLDivElement>document.createElement(tag)
  if (className) element.classList.add(className)
  return element
}
function setText(element: HTMLElement, query: string, text: string | number) {
  const target = <HTMLDivElement>element.querySelector(query)
  target.innerText = String(text)
}

function getText(element: HTMLElement, query: string) {
  const target = <HTMLDivElement>element.querySelector(query)
  return target.innerText
}
function removeElement(element: Element) {
  element.parentElement.removeChild(element)
}

function getSibling(element: Element) {
  return element.parentElement.children
}
abstract class View {
  $element: HTMLElement
  constructor(id: string, tag: string = 'div') {
    this.$element = createElement(tag)
    this.$element.setAttribute('id', id)
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
  queryAll(query: string) {
    return this.$element.querySelectorAll(query)
  }
  clear() {
    this.$element.innerHTML = ''
  }
  hide() {
    this.$element.classList.add('hidden')
  }
  show() {
    this.$element.classList.remove('hidden')
  }
  abstract mount(): void
  init() {
    return ''
  }
}

export { createElement, setText, getText, removeElement, getSibling, View }
