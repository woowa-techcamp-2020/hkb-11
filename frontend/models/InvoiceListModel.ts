import Observable from '../utils/Observer'

export default class InvoiceModel extends Observable {
  invoice = {
    id: '123',
    item: '123',
  }

  constructor() {
    super()
  }

  getData() {
    return this.invoice
  }

  mutateInvoice(newId, newItem) {
    this.invoice.id = newId
    this.invoice.item = newItem
    this.emit('CHANGE_INVOICE', this.invoice)
    console.log('change invoice')
  }
}
