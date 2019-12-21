import { Component } from "preact";
import { Image } from "preact-fluid";

export default class Icon extends Component {
  render({ src }) {
    return <Image className="image-icon" src={src} />;
  }
}
