import { Component } from 'preact'

import CircleButton from '../../components/CircleButton'
import { calculateResults } from '../helpers'
import routes from '../routes'

const formatNumber = number => (
  <span style={{ marginRight: '1px' }}>{Number(number.toFixed(2))}</span>
)

export default class ThirdStep extends Component {
  render({ weight, inputUnit, outputUnit, barbellType }) {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const percentages = urlSearchParams
      .getAll('percentage')
      .map(number => Number(number))

    const results = calculateResults({
      weight,
      inputUnit,
      outputUnit,
      barbellType,
      percentages
    })

    return (
      <div className="results">
        <div className="results__table">
          <div className="results__table__header">%</div>
          <div className="results__table__header">Total</div>
          <div className="results__table__header">Cada lado</div>
          {results.map(({ percentage, total, eachSide }) => {
            return (
              <>
                <div>{formatNumber(percentage)}%</div>
                <div>
                  {formatNumber(total)}
                  {outputUnit}
                </div>
                <div>
                  {eachSide > 0 ? formatNumber(eachSide) : '--'}
                  {eachSide > 0 && outputUnit}
                </div>
              </>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <CircleButton
            type="back_arrow"
            onClick={() => {
              window.location.assign(
                `${routes.SECOND_STEP}${window.location.search}`
              )
            }}
          />
          <CircleButton
            type="home"
            onClick={() => window.location.assign(routes.FIRST_STEP)}
          />
        </div>
      </div>
    )
  }
}
