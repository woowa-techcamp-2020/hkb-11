const queries = {
  INSERT_INVOICE:
    'INSERT INTO Invoice (date, categoryId, paymentMethodId, item, amount) VALUES (?, ?, ?, ?, ?)',
}
export default queries
