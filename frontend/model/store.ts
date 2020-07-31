import { Observable } from '.'
class GlobalModel extends Observable {}

const store = new GlobalModel()

export default store
