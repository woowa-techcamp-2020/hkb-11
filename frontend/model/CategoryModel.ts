import { Observable } from '.'
import { Category } from '../../types'
import { EVENT } from '../utils/constants'

export class CategoryModel extends Observable {
  categories: Array<Category> = []

  setCategories(categories: Array<Category>) {
    this.clear()
    this.categories = categories
    this.emit(EVENT.SET_CATEGORIES, this.categories)
  }

  findCategoryById(id: number) {
    return this.categories.find((category) => category.id === id)
  }

  clear() {
    this.categories = new Array<Category>()
    this.emit(EVENT.CLEAR_CATEGORIES)
  }

  render() {
    this.emit(EVENT.SET_CATEGORIES, this.categories)
  }
}
