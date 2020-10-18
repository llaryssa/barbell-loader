import { Component } from 'preact'

export default class Icon extends Component {
  render({ src }) {
    return <img className="image-icon" src={src} />
  }
}
