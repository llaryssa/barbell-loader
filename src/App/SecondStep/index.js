import { Component } from 'preact'

import NumberInputGhost from '../../components/NumberInputGhost'
import CircleButton from '../../components/CircleButton'

const defaultPercentageIncrease = 10

const getPercentageIncrease = percentages => {
  const beforeLast = percentages[percentages.length - 2]
  const last = percentages[percentages.length - 1]

  if (percentages.length < 2 || last < beforeLast)
    return defaultPercentageIncrease

  return (
    percentages[percentages.length - 1] - percentages[percentages.length - 2]
  )
}

const addNewPercentage = percentages => [
  ...percentages,
  percentages[percentages.length - 1] + getPercentageIncrease(percentages)
]

const changePercentage = (percentages, index, value) =>
  percentages.map((val, idx) => (index === idx ? Number(value) : val))

export default class SecondStep extends Component {
  render(
    { onSubmit, onBack, percentages: percentagesFromProps },
    { percentages = percentagesFromProps || [50] }
  ) {
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

        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <CircleButton type="back_arrow" onClick={() => onBack(percentages)} />
          <CircleButton type="arrow" onClick={() => onSubmit(percentages)} />
        </div>
      </div>
    )
  }
}
