import { cloneElement, Component } from 'preact'

import './style.scss'

export default class Wizard extends Component {
  render({ number, title, children, ...otherProps }) {
    return (
      <div className="wizard">
        <h2 className="wizard-header">
          <div className="wizard-header-number">{number}</div>
          {title}
        </h2>
        <div className="wizard-content">
          {cloneElement(children, { ...otherProps })}
        </div>
      </div>
    )
  }
}
