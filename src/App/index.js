import { Component } from 'preact'

import SelectionGroup from '../components/SelectionGroup'
import NumberInput from '../components/NumberInput'
import NumberInputGhost from '../components/NumberInputGhost'
import Icon from '../components/Icon'

import FirstStep from './FirstStep'
import Wizard from './Wizard'
import { calculateResults } from './helpers'
import './style.scss'

var weightUnitRadio = [
  { value: 'kg', title: 'Kg' },
  { value: 'lb', title: 'Lb' }
]

var barbellTypeRadio = [
  { value: 'female', title: 'Feminina (35lb/15kg)' },
  { value: 'male', title: 'Masculina (45lb/20kg)' }
]

var formatDisplayNumber = number => number.toFixed(2)

export default class App extends Component {
  render(
    {},
    {
      step = 0,
      weight,
      percentage = '100',
      inputUnit = 'kg',
      outputUnit = 'lb',
      barbellType = 'female',
      output
    }
  ) {
    return (
      <div className="app-container">
        <div className="app-content">
          <h2>Barbell Loader</h2>
          <br />
          <Wizard number={1} title="Testing">
            <FirstStep />
            {/* <NumberInputGhost
            className="number-input-ghost"
              value={weight}
              placeholder="Peso ghost"
              onChange={weight => this.setState({ weight })}
            />

            <div className="two-elements-centered">
              <Icon src="assets/scale.svg" />
              <NumberInput
                className="number-input__weight"
                value={weight}
                placeholder="Peso"
                onChange={weight => this.setState({ weight })}
              />
            </div>
            <br />
            <div className="two-elements-centered">
              <Icon src="assets/kgs.svg" />
              <div className="conversion-section">
                <SelectionGroup
                  name="inputWeightUnit"
                  defaultChecked={inputUnit}
                  values={weightUnitRadio}
                  onChange={inputUnit => this.setState({ inputUnit })}
                />
                <Icon src="assets/arrow-right.svg" />
                <SelectionGroup
                  name="outputWeightUnit"
                  defaultChecked={outputUnit}
                  values={weightUnitRadio}
                  onChange={outputUnit => this.setState({ outputUnit })}
                />
              </div>
            </div> */}
          </Wizard>
          <br />
          <br />
          <br />
          <div style={{ height: '400px'}}></div>
          <br />
          <br />
          <div className="two-elements-centered">
            <Icon src="assets/percent.svg" />
            <NumberInput
              className="number-input__weight"
              value={percentage}
              placeholder="Porcentagem"
              onChange={percentage => this.setState({ percentage })}
            />
          </div>
          <br />
          <div className="two-elements-centered">
            <Icon src="assets/barbell.svg" />
            <SelectionGroup
              name="barbellType"
              defaultChecked={barbellType}
              values={barbellTypeRadio}
              onChange={barbellType => this.setState({ barbellType })}
            />
          </div>
          <br />
          <button
            className="button"
            disabled={!weight}
            onClick={() => {
              var output = calculateResults(
                weight,
                percentage,
                barbellType,
                inputUnit,
                outputUnit
              )
              this.setState({ output })
              console.log({ output })
            }}
          >
            Calcular
          </button>

          <br />
          {output && (
            <div className="result-div">
              {output.converted && (
                <span>
                  Convertido: {formatDisplayNumber(output.converted)}
                  {outputUnit}
                </span>
              )}
              <br />
              {output.final && (
                <span>
                  Final: {formatDisplayNumber(output.final)}
                  {outputUnit}
                </span>
              )}
              <br />
              {output.eachSide && (
                <span>
                  De cada lado: {formatDisplayNumber(output.eachSide)}
                  {outputUnit}
                </span>
              )}
              <br />
            </div>
          )}
        </div>
      </div>
    )
  }
}
