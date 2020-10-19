import { Component } from 'preact'

import './style.css'

export default class Wizard extends Component {
  render({ number, title, children }) {
    return (
      <div className="wizard">
        <h2 className="wizard-header">
          <div className="wizard-header-number">{number}</div>
          {title}
        </h2>
        <div className="wizard-content">{children}</div>
      </div>
    )
  }
}
