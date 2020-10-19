import { Component } from 'preact'

import SelectionGroup from '../../components/SelectionGroup'
import NumberInputGhost from '../../components/NumberInputGhost'

const weightUnitRadio = [
  { value: 'kg', title: 'Kg' },
  { value: 'lb', title: 'Lb' }
]

const barbellTypeRadio = [
  { value: 'female', title: 'Feminina (35lb/15kg)' },
  { value: 'male', title: 'Masculina (45lb/20kg)' }
]

export default class FirstStep extends Component {
  render(
    {},
    { weight, inputUnit = 'kg', outputUnit = 'lb', barbellType = 'female' }
  ) {
    return (
      <div>
        <div>
          <NumberInputGhost
            value={weight}
            placeholder="65"
            onChange={weight => this.setState({ weight })}
          />
          <SelectionGroup
            name="inputWeightUnit"
            defaultChecked={inputUnit}
            values={weightUnitRadio}
            onChange={inputUnit => this.setState({ inputUnit })}
          />
        </div>
        <div>
          Barra
          <SelectionGroup
            name="barbellType"
            defaultChecked={barbellType}
            values={barbellTypeRadio}
            onChange={barbellType => this.setState({ barbellType })}
          />
        </div>
        <div>
          Output
          <SelectionGroup
            name="outputWeightUnit"
            defaultChecked={outputUnit}
            values={weightUnitRadio}
            onChange={outputUnit => this.setState({ outputUnit })}
          />
        </div>
      </div>
    )
  }
}
