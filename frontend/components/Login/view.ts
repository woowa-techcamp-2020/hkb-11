import * as api from '../../api'
import { View } from '../view'
import './style.scss'
import { template } from './template'
export default class LoginView extends View {
  $login: HTMLButtonElement
  $signup: HTMLButtonElement
  $id: HTMLInputElement
  $password: HTMLInputElement
  constructor() {
    super(template)
    this.$element.addEventListener('click', async ({ target }) => {
      if (!(target instanceof HTMLButtonElement)) return
      if (target === this.$login) {
        await api.login({
          id: this.$id.value,
          password: this.$password.value,
        })
      }
      if (target === this.$signup) {
        await api.signup({
          id: this.$id.value,
          password: this.$password.value,
        })
      }
    })
  }
  mount(): void {
    this.$login = <HTMLButtonElement>this.query('.button-login')
    this.$signup = <HTMLButtonElement>this.query('.button-signup')
    this.$id = <HTMLInputElement>this.query('#id')
    this.$password = <HTMLInputElement>this.query('#password')
  }
}
