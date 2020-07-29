import actions from '../../models/actions'
import InvoiceListModel from '../../models/InvoiceListModel'
import { INVOICE_CLASS } from '../../utils/constants'
import { templateToElement } from '../../utils/HtmlGenerator'

class InvoiceView {
  template = `
      <div>
        <div class='${INVOICE_CLASS.ID}'></div>
        <div class='${INVOICE_CLASS.ITEM}'></div>
      </div>
  `
  $target: Element
  $id: HTMLElement
  $item: HTMLElement

  constructor() {
    this.$target = templateToElement(this.template)
    this.$id = this.$target.querySelector(`.${INVOICE_CLASS.ID}`)
    this.$item = this.$target.querySelector(`.${INVOICE_CLASS.ITEM}`)

    document.body.appendChild(this.$target)
  }

  bindItemClickHandler(handler) {
    this.$item.addEventListener('click', handler)
  }

  changeWindow(data) {
    this.$id.innerText = data.id
    this.$item.innerText = data.item
  }
}

export default class Invoice {
  model: InvoiceListModel
  view: InvoiceView

  constructor() {
    console.log('hi Invoice')
    this.model = new InvoiceListModel()
    this.view = new InvoiceView()
    this.bindEvents()
    this.changeView()
  }

  bindEvents() {
    this.view.bindItemClickHandler(() => {
      actions.fetchInvoice(this.model)
    })

    this.model.on('CHANGE_INVOICE', this.changeView.bind(this))
  }

  changeView() {
    const data = this.model.getData()
    this.view.changeWindow(data)
  }
}
