import { Component } from 'preact'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Wizard from './Wizard'
import { calculateResults } from './helpers'
import './style.scss'

const STEP_TITLES = {
  0: 'Peso e barra',
  1: 'Porcentagens',
  2: 'Resultados'
}

export default class App extends Component {
  render({}, { step = 0, data = {}, percentages = [] }) {
    return (
      <div className="app-container">
        <div className="app-container__content">
          <h2>Calculadora de pesos</h2>
          <br />
          <Wizard number={step + 1} title={STEP_TITLES[step]}>
            {step === 0 && (
              <FirstStep
                onSubmit={data => this.setState({ data, step: step + 1 })}
              />
            )}
            {step === 1 && (
              <SecondStep
                onSubmit={percentages =>
                  this.setState({ percentages, step: step + 1 })
                }
              />
            )}
            {step === 2 && (
              <ThirdStep
                onSubmit={() => this.setState({ step: 0 })}
                results={calculateResults({ ...data, percentages })}
                resultsUnit={data.outputUnit}
              />
            )}
          </Wizard>
        </div>
      </div>
    )
  }
}
