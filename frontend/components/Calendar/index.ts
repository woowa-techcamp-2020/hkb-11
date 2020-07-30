export default class Calendar {
  $element: HTMLElement

  constructor() {
    this.$element = document.createElement('div')
    this.$element.innerHTML = `
      <div id='calendar' style='height: 100vh;'>

      <div>
    `

    document.body.prepend(this.$element)
  }
}
