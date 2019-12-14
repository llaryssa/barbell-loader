import { Component } from "preact";
import { Grid } from "preact-fluid";
import cx from "classnames"
import _ from "lodash"

export default class SelectionGroup extends Component {
  render({ name, values, defaultChecked, onChange }) {
    if (!values || !values.length) return null;

    // return (
    //   <div className="selection-group">
    //     {values.map(({ value, title }) => (
    //       <div>
    //         <input
    //           type="radio"
    //           name={name}
    //           value={value}
    //           checked={defaultChecked === value}
    //           onChange={event => onChange(event.target.value)}
    //         />
    //         {title}
    //       </div>
    //     ))}
    //   </div>
    // );

    return (
      <div className="selection-group">
        {values.map(({ value, title }) => (
          <div
            className={cx("selection-group__item", {
							checked: defaultChecked === value,
							left: _.head(values).value === value,
							right: _.last(values).value === value
            })}
            onClick={() => onChange(value)}
          >
            {title}
          </div>
        ))}
      </div>
    );
  }
}
