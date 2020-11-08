import { Component } from 'preact'

import NumberInputGhost from '../../components/NumberInputGhost'
import CircleButton from '../../components/CircleButton'
import routes from '../routes'

const defaultPercentageIncrease = 10
const defaultPercentages = [50]

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
  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const percentages = urlSearchParams
      .getAll('percentage')
      .map(number => Number(number))

    this.setState({
      percentages: percentages.length ? percentages : defaultPercentages
    })
  }

  render({}, { percentages = [] }) {
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
          <CircleButton
            type="back_arrow"
            onClick={() => {
              window.location.assign(
                `${routes.FIRST_STEP}?${this.getSearchString(percentages)}`
              )
            }}
          />
          <CircleButton
            type="arrow"
            onClick={() => {
              window.location.assign(
                `${routes.THIRD_STEP}?${this.getSearchString(percentages)}`
              )
            }}
          />
        </div>
      </div>
    )
  }

  getSearchString = percentages => {
    const { search } = window.location
    const searchParams = new URLSearchParams(search)
    searchParams.delete('percentage')
    percentages.forEach(percentage =>
      searchParams.append('percentage', percentage)
    )

    return searchParams.toString()
  }
}
