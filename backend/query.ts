const queries = {
  INSERT_INVOICE:
    'INSERT INTO Invoice (date, categoryId, paymentMethodId, item, amount) VALUES (?, ?, ?, ?, ?)',
  SELECT_CATEGORIES: `SELECT * FROM Category`,
}
export default queries
