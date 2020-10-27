import { Component } from 'preact'

import NumberInputGhost from '../../components/NumberInputGhost'
import CircleButton from '../../components/CircleButton'

const marginStyle = { marginBottom: '32px' }

const defaultPercentageIncrease = 10

const addNewPercentage = percentages => [
  ...percentages,
  percentages[percentages.length - 1] + defaultPercentageIncrease
]

const changePercentage = (percentages, index, value) =>
  percentages.map((val, idx) => (index === idx ? Number(value) : val))

export default class SecondStep extends Component {
  render({ onSubmit }, { percentages = [50] }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Quais as porcentagens do exercício?</h3>
        <div>
          {percentages.map((percentage, index) => {
            return (
              <div>
                <NumberInputGhost
                  value={percentage}
                  onChange={number =>
                    this.setState({
                      percentages: changePercentage(percentages, index, number)
                    })
                  }
                />
                {index === percentages.length - 1 && (
                  <CircleButton
                    type="add"
                    color="orange"
                    inline
                    onClick={() =>
                      this.setState({
                        percentages: addNewPercentage(percentages)
                      })
                    }
                  />
                )}
              </div>
            )
          })}
        </div>

        <CircleButton type="arrow" onClick={() => onSubmit(percentages)} />
      </div>
    )
  }
}
