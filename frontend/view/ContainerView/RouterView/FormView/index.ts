import { View } from '../../../index'
import './style.scss'
import { template } from './template'

export default class FormView extends View {
  $clearForm: HTMLButtonElement
  $submit: HTMLButtonElement

  constructor() {
    super(template)
  }
  mount(): void {
    this.$submit = <HTMLButtonElement>this.query('.button-submit')
  }
  bindInvoiceAddHandler(handler) {
    this.$submit.addEventListener('click', handler)
  }
}
