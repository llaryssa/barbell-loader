import { Component } from 'preact'

import SelectionGroup from '../../components/SelectionGroup'
import NumberInputGhost from '../../components/NumberInputGhost'
import CircleButton from '../../components/CircleButton'
import routes from '../routes'

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
    {
      weight: propsWeight = 100,
      inputUnit: propsInputUnit = 'kg',
      outputUnit: propsOutputUnit = 'lb',
      barbellType: propsBarbellType = 'female'
    },
    {
      weight = propsWeight,
      inputUnit = propsInputUnit,
      outputUnit = propsOutputUnit,
      barbellType = propsBarbellType
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
          onClick={() => {
            const { search } = window.location
            const searchParams = new URLSearchParams(search)
            searchParams.set('inputUnit', inputUnit)
            searchParams.set('outputUnit', outputUnit)
            searchParams.set('weight', weight)
            searchParams.set('barbellType', barbellType)

            window.location.assign(
              `${routes.SECOND_STEP}?${searchParams.toString()}`
            )
          }}
        />
      </div>
    )
  }
}
