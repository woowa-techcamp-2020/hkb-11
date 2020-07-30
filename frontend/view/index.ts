function createElement(tag: string, className?: string): HTMLDivElement {
  const element = document.createElement(tag) as HTMLDivElement
  if (className) element.classList.add(className)
  return element
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

export { createElement, View }
