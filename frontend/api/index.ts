type InvoiceType = {
  id: string
  item: string
}

export const testInvoiceApi = (): [InvoiceType, number] => {
  //fetch

  const data: InvoiceType = {
    id: 'new id',
    item: 'hihi',
  }

  const status: number = 200

  return [data, status]
}
