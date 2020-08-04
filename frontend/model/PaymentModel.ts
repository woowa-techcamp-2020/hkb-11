import { Observable } from '.'
import { PaymentMethod } from '../../types'
import { EVENT } from '../utils/constants'

export class PaymentModel extends Observable {
  paymentMethods: Array<PaymentMethod> = []

  setPaymentMethods(paymentMethods: Array<PaymentMethod>) {
    this.clear()
    this.paymentMethods = paymentMethods
    this.emit(EVENT.SET_PAYMENTS, this.paymentMethods)
  }

  findPaymentMethodsById(id: number) {
    return this.paymentMethods.find((paymentMethod) => paymentMethod.id === id)
  }

  clear() {
    this.paymentMethods = new Array<PaymentMethod>()
    this.emit(EVENT.CLEAR_PAYMENTS)
  }

  render() {
    this.emit(EVENT.CLEAR_PAYMENTS, this.paymentMethods)
  }
}
