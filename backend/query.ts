const queries = {
  INSERT_INVOICE:
    'INSERT INTO Invoice (date, categoryId, paymentMethodId, item, amount) VALUES (?, ?, ?, ?, ?)',
  SELECT_CATEGORY_LIST: `SELECT * FROM Category`,
  SELECT_PAYMENT_METHOD_LIST: `SELECT * FROM PaymentMethod`,
  SELECT_PAYMENT_METHOD: `SELECT * FROM PaymentMethod WHERE id=?`,
  INSERT_PAYMENT_METHOD: `INSERT INTO PaymentMethod (title, userId) VALUES (?, ?)`,
  DELETE_PAYMENT_METHOD: `DELETE FROM PaymentMethod WHERE id=?`,
}
export default queries
