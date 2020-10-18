import { Component } from 'preact'
import cx from 'classnames'

export default class NumberInput extends Component {
  render({ className, value, placeholder, onChange }) {
    return (
      <input
        className={cx('number-input', className)}
        hideLabel
        placeholder={placeholder}
        value={value}
        type="number"
        onChange={event => onChange(event.target.value)}
        cell={{
          middle: true,
          width: 12
        }}
      />
    )
  }
}
