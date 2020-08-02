type IEvent = {
  type: string
  handler: Function
}
export class Observable {
  observers: Set<IEvent> = new Set()
  on(type: string, handler: Function) {
    console.log('ON ', type)
    this.observers.add({
      type,
      handler,
    })
  }
  off(type: string) {
    console.log('OFF ', type)
    Array.from(this.observers)
      .filter((x) => x.type === type)
      .forEach((item: IEvent) => {
        this.observers.delete(item)
      })
  }
  emit(type: string, payload = undefined) {
    console.log(`EMIT ${type} > `, payload)
    Array.from(this.observers)
      .filter((x) => x.type === type)
      .forEach((observer) => {
        observer.handler(payload)
      })
  }
}
