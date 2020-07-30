export class Observable {
  observers: Set<{ type: string; handler: Function }> = new Set()
  on(type: string, handler: Function) {
    this.observers.add({
      type,
      handler,
    })
  }
  emit(type: string, payload = undefined) {
    Array.from(this.observers)
      .filter((x) => x.type === type)
      .forEach((observer) => {
        observer.handler(payload)
      })
  }
}
