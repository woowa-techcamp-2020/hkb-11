import { PaymentMethod } from '../../../types'
import { PaymentModel } from '../../model/PaymentModel'
import { EVENT } from '../../utils/constants'
import { App } from '../app'
import { Component } from '../component'
import { default as ModalView } from './view'

export class Modal extends Component<ModalView, App> {
  paymentModel: PaymentModel

  constructor(parent, view: ModalView) {
    super(parent, view)

    this.paymentModel = this.parent.paymentModel

    this.view.bindButtonPaymentModalHandler(() => {
      this.view.showModal()
    })
  }

  bind() {
    this.paymentModel.on(EVENT.SET_PAYMENTS, (payments: PaymentMethod[]) => {
      this.view.setPayments(payments)
    })

    this.paymentModel.on(EVENT.ADD_PAYMENT, (payment: PaymentMethod) => {
      this.view.addPayment(payment)
    })
  }

  unbind() {
    this.paymentModel.off(EVENT.ADD_PAYMENT)
    this.paymentModel.off(EVENT.SET_PAYMENTS)
  }
}
