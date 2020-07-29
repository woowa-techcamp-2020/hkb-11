const queries = {
  SELECT_CATEGORY_LIST: `SELECT * FROM Category`,
  SELECT_PAYMENT_METHOD_LIST: `SELECT * FROM PaymentMethod`,
  SELECT_PAYMENT_METHOD: `SELECT * FROM PaymentMethod WHERE id=?`,
  INSERT_PAYMENT_METHOD: `INSERT INTO PaymentMethod (title, userId) VALUES (?, ?)`,
  DELETE_PAYMENT_METHOD: `DELETE FROM PaymentMethod WHERE id=?`,
  SELECT_INVOICE_LIST: `SELECT * FROM Invoice WHERE YEAR(date)=? AND MONTH(date)=?`,
  SELECT_INVOICE: `SELECT * FROM Invoice WHERE id=?`,
  INSERT_INVOICE:
    'INSERT INTO Invoice (date, categoryId, paymentMethodId, item, amount) VALUES (?, ?, ?, ?, ?)',
  DELETE_INVOICE_METHOD: `DELETE FROM Invoice WHERE id=?`,
}
export default queries
