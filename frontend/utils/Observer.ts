export default class Observable {
  on(type: string, callback: any) {
    this['_on' + type] = this['_on' + type] || []
    this['_on' + type].push(callback)
  }

  off(type: string, removedCallback: any) {
    this['_on' + type] = this['_on' + type].filter(
      (callback) => callback !== removedCallback
    )
  }

  emit(type: string, args: any) {
    this['_on' + type] &&
      this['_on' + type].forEach((callback) => {
        callback(args)
      })
  }
}
