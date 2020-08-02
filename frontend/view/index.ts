import { templateToElement } from '../utils/ElementGenerator'

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
  constructor(template: string) {
    this.$element = templateToElement(template) as HTMLElement
    this.mount()
  }
  appendToElement($element: HTMLElement) {
    $element.appendChild(this.$element)
  }
  appendToView(view: View) {
    this.appendToElement(view.$element)
  }
  remove() {
    const $parentElement = this.$element.parentElement
    if (!$parentElement) return
    $parentElement.removeChild(this.$element)
  }
  query(query: string) {
    return this.$element.querySelector(query)
  }
  queryAll(query: string) {
    return this.$element.querySelectorAll(query)
  }
  clear() {}
  hide() {
    this.$element.classList.add('hidden')
  }
  show() {
    this.$element.classList.remove('hidden')
  }
  abstract mount(): void
}

export { setText, getText, removeElement, getSibling, View }
