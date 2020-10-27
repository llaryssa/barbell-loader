import { Component } from 'preact'
import cx from 'classnames'

const TYPES_SRC = {
  arrow: 'assets/right-arrow.svg',
  home: 'assets/home.svg',
  add: 'assets/plus.svg'
}

export default class CircleButton extends Component {
  render({ type, onClick, inline, color }) {
    const classes = cx('circle-button', { inline, orange: color === 'orange' })
    return (
      <button className={classes} onClick={onClick}>
        <img src={TYPES_SRC[type]} />
      </button>
    )
  }
}
