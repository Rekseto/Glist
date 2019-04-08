export function splitIntoArrayDataSet(inputDataSet) {
  const outputDataSet = [];
  for (const prop in inputDataSet) {
    outputDataSet.push({
      x: prop,
      count: inputDataSet[prop]
    });
  }

  return outputDataSet;
}

export function countByField(field, inputDataSet) {
  const object = {};
  for (const element of inputDataSet) {
    if (!object[element[field]]) object[element[field]] = 0;
    object[element[field]]++;
  }

  return splitIntoArrayDataSet(object);
}
