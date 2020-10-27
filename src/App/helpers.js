var kgToLbRatio = 2.20462

var getBarbellWeight = (type, unit) => {
  if (unit === 'lb') return type === 'female' ? 35 : 45
  if (unit === 'kg') return type === 'female' ? 15 : 20
}

var convertWeight = (weight, inputUnit, outputUnit) => {
  if (inputUnit === 'kg' && outputUnit === 'lb') return weight * kgToLbRatio
  if (inputUnit === 'lb' && outputUnit === 'kg') return weight / kgToLbRatio
}

var calculateResults = ({
  weight,
  barbellType,
  inputUnit,
  outputUnit,
  percentages
}) => {
  // var weight = parseFloat(weightString)
  var barbellWeight = getBarbellWeight(barbellType, outputUnit)
  var willConvert = inputUnit != outputUnit

  return percentages.map(percentage => {
    var willApplyPercentage = percentage !== 100

    var convertedWeight = willConvert
      ? convertWeight(weight, inputUnit, outputUnit)
      : weight
    var total = willApplyPercentage
      ? (percentage * convertedWeight) / 100
      : convertedWeight

      console.log({ willConvert, weight })

    return { percentage, total, eachSide: (total - barbellWeight) / 2 }
  })
}

module.exports = { calculateResults }
