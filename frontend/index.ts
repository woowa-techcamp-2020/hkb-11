import { MainComponent } from './components'
import { MainState } from './store'
import { MainView } from './view'

new MainComponent(new MainState(), new MainView())
