export class Observable {
  observers: Set<{ type: string; handler: Function }> = new Set()
  on(type: string, handler: Function) {
    this.observers.add({
      type,
      handler,
    })
    console.log(this.observers)
  }
  emit(type: string, payload = undefined) {
    Array.from(this.observers)
      .filter((x) => x.type === type)
      .forEach((observer) => {
        console.log('hi ', observer)
        observer.handler(payload)
      })
  }
}

type Item = {
  id: string
  content: string
}

export class MainState extends Observable {
  items: Array<Item> = []
  addItem(item: Item) {
    console.log(item)
    this.items = [...this.items, item]
    this.emit('ADD_ITEM', item)
  }
  clearItem() {
    this.items = new Array<Item>()
    this.emit('CLEAR_ITEM')
  }
}
