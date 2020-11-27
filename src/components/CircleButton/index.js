import { Component } from 'preact'
import cx from 'classnames'

const TYPES_SRC = {
  arrow: 'assets/right-arrow.svg',
  back_arrow: 'assets/left-arrow.svg',
  home: 'assets/home.svg',
  add: 'assets/plus.svg',
  reload: 'assets/reload.svg'
}

export default class CircleButton extends Component {
  render({ type, onClick, inline, color }) {
    const classes = cx('circle-button', {
      inline,
      orange: color === 'orange',
      left: type === 'back_arrow'
    })
    return (
      <button className={classes} onClick={onClick}>
        <img src={TYPES_SRC[type]} />
      </button>
    )
  }
}
