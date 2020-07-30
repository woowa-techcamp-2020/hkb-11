import { Observable } from '.'
export class GlobalModel extends Observable {}

const store = new GlobalModel()

export default store
