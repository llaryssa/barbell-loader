import { Component } from 'preact'
import Helmet from 'preact-helmet'
import Router from 'preact-router'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Wizard from './Wizard'
import routes from './routes'
import './style.scss'

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Helmet title="Calculadora de pesos" />
        <div className="app-container__content">
          <h2>Calculadora de pesos</h2>
          <br />
          <Router>
            <Wizard path={routes.FIRST_STEP} number={1} title="Peso e barra">
              <FirstStep />
            </Wizard>
            <Wizard path={routes.SECOND_STEP} number={2} title="Porcentagens">
              <SecondStep />
            </Wizard>
            <Wizard path={routes.THIRD_STEP} number={3} title="Resultados">
              <ThirdStep />
            </Wizard>
          </Router>
        </div>
      </div>
    )
  }
}
