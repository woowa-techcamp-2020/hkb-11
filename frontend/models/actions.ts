import { testInvoiceApi } from '../api'

const fetchInvoice = (modelObservable) => {
  const [data, status] = testInvoiceApi()
  console.log('before action')
  modelObservable.mutateInvoice(data.id, data.item)
  console.log('after action')
}

export default {
  fetchInvoice,
}
