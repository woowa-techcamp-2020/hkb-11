import pool from '../pool'
import query from '../query'

const selectCategoryList = async () => {
  try {
    const [rows] = await pool.query(query.SELECT_CATEGORY_LIST)
    return rows
  } catch (e) {
    throw e
  }
}

export default {
  selectCategoryList,
}
