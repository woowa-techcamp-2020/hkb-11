import pool from '../pool'
import query from '../query'

const selectCategories = async () => {
  try {
    const [rows] = await pool.query(query.SELECT_CATEGORIES)
    return rows
  } catch (e) {
    throw e
  }
}

export default {
  selectCategories,
}
