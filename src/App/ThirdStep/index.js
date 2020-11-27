import { Component } from 'preact'

import CircleButton from '../../components/CircleButton'

const formatNumber = number => (
  <span style={{ marginRight: '1px' }}>{Number(number.toFixed(2))}</span>
)

export default class ThirdStep extends Component {
  render({ results, resultsUnit, onSubmit, onBack }) {
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
                  {resultsUnit}
                </div>
                <div>
                  {eachSide > 0 ? formatNumber(eachSide) : '--'}
                  {eachSide > 0 && resultsUnit}
                </div>
              </>
            )
          })}
        </div>

        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <CircleButton type="back_arrow" onClick={onBack} />
          <CircleButton type="reload" onClick={onSubmit} />
        </div>
      </div>
    )
  }
}
