import { Component } from 'preact'
import Helmet from 'preact-helmet'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Wizard from './Wizard'
import { calculateResults } from './helpers'
import '../gtm.js'
import './style.scss'

const STEP_TITLES = {
  0: 'Peso e barra',
  1: 'Porcentagens',
  2: 'Resultados'
}

export default class App extends Component {
  render({}, { step = 0, data, percentages }) {
    return (
      <div className="app-container">
        <Helmet title="Calculadora de pesos" />
        <div className="app-container__content">
          <h2>Calculadora de pesos</h2>
          <br />
          <Wizard number={step + 1} title={STEP_TITLES[step]}>
            {step === 0 && (
              <FirstStep
                data={data}
                onSubmit={data => this.setState({ data, step: step + 1 })}
              />
            )}
            {step === 1 && (
              <SecondStep
                percentages={percentages}
                onSubmit={percentages =>
                  this.setState({ percentages, step: step + 1 })
                }
                onBack={percentages =>
                  this.setState({ percentages, step: step - 1 })
                }
              />
            )}
            {step === 2 && (
              <ThirdStep
                onSubmit={() =>
                  this.setState({
                    step: 0,
                    data: undefined,
                    percentages: undefined
                  })
                }
                onBack={() => this.setState({ step: step - 1 })}
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
