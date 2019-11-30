import "./style";
import { Component } from "preact";

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
      <div>
        <h2>Barbell Loader</h2>
        Peso{" "}
        <NumberInput
          value={weight}
          onChange={weight => this.setState({ weight })}
        />
        <br />
        Porcentagem{" "}
        <NumberInput
          value={percentage}
          onChange={percentage => this.setState({ percentage })}
        />
        <br />
        Input Unit <br />
        <RadioGroup
          name="inputWeightUnit"
          defaultChecked={inputUnit}
          values={weightUnitRadio}
          onChange={inputUnit => this.setState({ inputUnit })}
        />
        Result Unit <br />
        <RadioGroup
          name="outputWeightUnit"
          defaultChecked={outputUnit}
          values={weightUnitRadio}
          onChange={outputUnit => this.setState({ outputUnit })}
        />
        Barbell Type <br />
        <RadioGroup
          name="barbellType"
          defaultChecked={barbellType}
          values={barbellTypeRadio}
          onChange={barbellType => this.setState({ barbellType })}
        />
        <br />
        <button
          onClick={() => {
            // checar se tem todos os campos?
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
        </button>
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

class NumberInput extends Component {
  render({ value, onChange }) {
    return (
      <input
        value={value}
        type="number"
        onInput={event => onChange(event.target.value)}
      />
    );
  }
}

class RadioGroup extends Component {
  render({ name, values, defaultChecked, onChange }) {
    if (!values || !values.length) return null;

    return (
      <div>
        {values.map(({ value, title }) => (
          <div>
            <input
              type="radio"
              name={name}
              value={value}
              checked={defaultChecked === value}
              onChange={event => onChange(event.target.value)}
            />
            {title}
          </div>
        ))}
      </div>
    );
  }
}
