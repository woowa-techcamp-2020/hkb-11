import { Component } from '.'
import { InvoiceModel } from '../model/InvoiceModel'
import RouterView from '../view/RouterView'

export class Container extends Component<RouterView, InvoiceModel> {
  constructor(view, model) {
    super(view, model)
  }
}
