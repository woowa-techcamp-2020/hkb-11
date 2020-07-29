const queries = {
  INSERT_INVOICE:
    'INSERT INTO Invoice (date, categoryId, paymentMethodId, item, amount) VALUES (?, ?, ?, ?, ?)',
  SELECT_CATEGORY_LIST: `SELECT * FROM Category`,
  SELECT_PAYMENT_METHOD_LIST: `SELECT * FROM PaymentMethod`,
  INSERT_PAYMENT_METHOD: `INSERT INTO PaymentMethod (title, userId) VALUES (?, ?)`,
}
export default queries
