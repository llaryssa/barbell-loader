import { Component } from 'preact'
import cx from 'classnames'

export default class NumberInputGhost extends Component {
  render({ className, value, placeholder, onChange }) {
    return (
      <input
        className={cx('number-input-ghost', className)}
        hideLabel
        placeholder={placeholder}
        value={value}
        type="number"
        inputmode="numeric"
        onChange={event => onChange(event.target.value)}
      />
    )
  }
}
