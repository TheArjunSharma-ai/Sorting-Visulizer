const CountingSort = (array, position, arraySteps, colorSteps) => {
  const colorKey = new Array(array.length).fill(0);
  arraySteps.push(array.slice());
  colorSteps.push(colorKey.slice());

  if (array.length === 0) {
    return;
  }

  const max = Math.max(...array);
  const count = new Array(max + 1).fill(0);

  // Step 1: Count occurrences of each value
  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;

    colorKey[i] = 1;
    colorSteps.push(colorKey.slice());
    arraySteps.push(array.slice());
    colorKey[i] = 0;
  }

  // Step 2: Build the sorted array
  let sortedIndex = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      array[sortedIndex] = i;
      colorKey[sortedIndex] = 2;
      colorSteps.push(colorKey.slice());
      arraySteps.push(array.slice());

      sortedIndex++;
      count[i]--;
    }
  }

  colorKey.fill(2);
  colorSteps.push(colorKey.slice());
  arraySteps.push(array.slice());
};

export default CountingSort;
