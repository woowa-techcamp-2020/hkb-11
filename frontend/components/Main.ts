import { Component } from '.'
import { Observable } from '../model'
import MainView from '../view/MainView'
export class Main extends Component<MainView, Observable> {
  constructor(view) {
    super(view)
  }
}
