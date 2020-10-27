import { Component } from 'preact'

import SelectionGroup from '../../components/SelectionGroup'
import NumberInputGhost from '../../components/NumberInputGhost'
import CircleButton from '../../components/CircleButton'

const weightUnitRadio = [
  { value: 'kg', title: 'Kg' },
  { value: 'lb', title: 'Lb' }
]

const barbellTypeRadio = [
  { value: 'female', title: 'Feminina (35lb/15kg)' },
  { value: 'male', title: 'Masculina (45lb/20kg)' }
]

const marginStyle = { marginBottom: '32px' }

export default class FirstStep extends Component {
  render(
    { onSubmit },
    {
      weight = 100,
      inputUnit = 'kg',
      outputUnit = 'lb',
      barbellType = 'female'
    }
  ) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Qual o seu RM?</h3>
        <div
          style={{
            ...marginStyle,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <NumberInputGhost
            value={weight}
            placeholder="65"
            onChange={weight => this.setState({ weight })}
          />
          <SelectionGroup
            style={{ marginBottom: '10px' }}
            name="inputWeightUnit"
            defaultChecked={inputUnit}
            values={weightUnitRadio}
            onChange={inputUnit => this.setState({ inputUnit })}
          />
        </div>

        <div style={marginStyle}>
          <h3>Qual a barra utilizada?</h3>
          <SelectionGroup
            name="barbellType"
            defaultChecked={barbellType}
            values={barbellTypeRadio}
            onChange={barbellType => this.setState({ barbellType })}
          />
        </div>

        <div>
          <h3>O resultado deve ser mostrado em:</h3>
          <SelectionGroup
            name="outputWeightUnit"
            defaultChecked={outputUnit}
            values={weightUnitRadio}
            onChange={outputUnit => this.setState({ outputUnit })}
          />
        </div>

        <CircleButton
          type="arrow"
          onClick={() =>
            onSubmit({ inputUnit, outputUnit, weight, barbellType })
          }
        />
      </div>
    )
  }
}
