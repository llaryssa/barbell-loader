import { Component } from "preact";

import SelectionGroup from "./components/SelectionGroup";
import NumberInput from "./components/NumberInput";

import "./style";
import Icon from "./components/Icon";
import { Button } from "preact-fluid";

var kgToLbRatio = 2.20462;

var weightUnitRadio = [
  { value: "kg", title: "Kg" },
  { value: "lb", title: "Lb" }
];

var barbellTypeRadio = [
  { value: "female", title: "Feminina (35lb/15kg)" },
  { value: "male", title: "Masculina (45lb/20kg)" }
];

var getBarbellWeight = (type, unit) => {
  if (unit === "lb") return type === "female" ? 35 : 45;
  if (unit === "kg") return type === "female" ? 15 : 20;
};

var convertWeight = (weight, inputUnit, outputUnit) => {
  if (inputUnit === "kg" && outputUnit === "lb") return weight * kgToLbRatio;
  if (inputUnit === "lb" && outputUnit === "kg") return weight / kgToLbRatio;
};

function doStuff(
  weightString,
  percentageString,
  barbellType,
  inputUnit,
  outputUnit
) {
  var weight = parseInt(weightString);
  var percentage = parseInt(percentageString);
  var barbellWeight = getBarbellWeight(barbellType, outputUnit);
  var willConvert = inputUnit != outputUnit;
  var willApplyPercentage = percentage !== 100;

  var convertedWeight = willConvert
    ? convertWeight(weight, inputUnit, outputUnit)
    : weight;
  var finalWeight = willApplyPercentage
    ? (percentage * convertedWeight) / 100
    : convertedWeight;

  return {
    converted: willConvert ? convertedWeight : undefined,
    final: finalWeight,
    eachSide: (finalWeight - barbellWeight) / 2
  };
}

export default class App extends Component {
  render(
    {},
    {
      weight,
      percentage = "100",
      inputUnit = "kg",
      outputUnit = "lb",
      barbellType = "female",
      output
    }
  ) {
    console.log({ weight, percentage, inputUnit, output });
    return (
      <div className="app-container">
        <h2>Barbell Loader</h2>
        <br />
        <div className="two-elements-centered">
          <Icon src="assets/scale.svg" />
          <NumberInput
            className="number-input__weight"
            value={weight}
            placeholder="Peso"
            onChange={weight => this.setState({ weight })}
          />
        </div>
        <br />
        <div className="two-elements-centered">
          <Icon src="assets/kgs.svg" />
          <div className="conversion-section">
            <SelectionGroup
              name="inputWeightUnit"
              defaultChecked={inputUnit}
              values={weightUnitRadio}
              onChange={inputUnit => this.setState({ inputUnit })}
            />
            <Icon src="assets/arrow-right.svg" />
            <SelectionGroup
              name="outputWeightUnit"
              defaultChecked={outputUnit}
              values={weightUnitRadio}
              onChange={outputUnit => this.setState({ outputUnit })}
            />
          </div>
        </div>
        <br />
        <div className="two-elements-centered">
          <Icon src="assets/percent.svg" />
          <NumberInput
            className="number-input__weight"
            value={percentage}
            placeholder="Porcentagem"
            onChange={percentage => this.setState({ percentage })}
          />
        </div>
        <br />
        <div className="two-elements-centered">
          <Icon src="assets/barbell.svg" />
          <SelectionGroup
            name="barbellType"
            defaultChecked={barbellType}
            values={barbellTypeRadio}
            onChange={barbellType => this.setState({ barbellType })}
          />
        </div>
        <br />
        <Button
          className="button"
          disabled={!weight}
          onClick={() => {
            var output = doStuff(
              weight,
              percentage,
              barbellType,
              inputUnit,
              outputUnit
            );
            this.setState({ output });
            console.log({ output });
          }}
        >
          Calculate
        </Button>

        <br />
        {output && (
          <div>
            {output.converted && (
              <span>
                Convertido: {output.converted.toFixed(1)}
                {outputUnit}
              </span>
            )}
            <br />
            {output.final && (
              <span>
                Final: {output.final.toFixed(1)}
                {outputUnit}
              </span>
            )}
            <br />
            {output.eachSide && (
              <span>
                De cada lado: {output.eachSide.toFixed(1)}
                {outputUnit}
              </span>
            )}
            <br />
          </div>
        )}
      </div>
    );
  }
}
