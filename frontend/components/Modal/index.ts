import { Component } from '..'
import { PaymentMethod } from '../../../types'
import { PaymentModel } from '../../model/PaymentModel'
import { EVENT } from '../../utils/constants'
import { App } from '../app'
import { default as ModalView } from './view'

export class Modal extends Component<ModalView, App> {
  paymentModel: PaymentModel

  constructor(parent, view: ModalView) {
    super(parent, view)

    this.paymentModel = this.parent.paymentModel

    this.paymentModel.on(EVENT.SET_PAYMENTS, (payments: PaymentMethod[]) => {
      this.view.setPayments(payments)
    })

    this.paymentModel.on(EVENT.ADD_PAYMENT, (payment: PaymentMethod) => {
      this.view.addPayment(payment)
    })

    this.paymentModel.on(EVENT.REMOVE_PAYMENT, (id: number) => {
      this.view.removePayment(id)
    })

    this.view.bindPaymentAddHandler((payment: PaymentMethod) => {
      this.paymentModel.addPaymentMethod(payment)
      this.view.clearModal()
    })

    this.view.bindPaymentRemoveHandler((paymentId: number) => {
      this.paymentModel.removePaymentMethod(paymentId)
    })
  }
}
