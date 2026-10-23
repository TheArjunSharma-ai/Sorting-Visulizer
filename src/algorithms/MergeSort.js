const MergeSort = (array, position, arraySteps, colorSteps) => {
  const colorKey = new Array(array.length).fill(0);
  const recordStep = () => {
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  };

  recordStep();

  const mergeSort = (start, end) => {
    if (end - start <= 1) {
      return;
    }

    const middle = Math.floor((start + end) / 2);
    mergeSort(start, middle);
    mergeSort(middle, end);

    const merged = [];
    let left = start;
    let right = middle;

    while (left < middle && right < end) {
      merged.push(array[left] <= array[right] ? array[left++] : array[right++]);
    }
    while (left < middle) merged.push(array[left++]);
    while (right < end) merged.push(array[right++]);

    for (let index = 0; index < merged.length; index++) {
      array[start + index] = merged[index];
      colorKey[start + index] = 1;
      recordStep();
    }

    colorKey.fill(2, start, end);
    recordStep();
  };

  mergeSort(0, array.length);
  colorKey.fill(2);
  recordStep();
};

export default MergeSort;
