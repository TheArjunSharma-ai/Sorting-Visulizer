const QuickSort = (array, position, arraySteps, colorSteps) => {
  const colorKey = new Array(array.length).fill(0);
  const recordStep = () => {
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  };

  recordStep();

  const partition = (arr, left, right, colorKey) => {
    let pivot = arr[right];  // Choosing the pivot element (last element)
    let i = left - 1;

    colorKey[right] = 1;
    recordStep();

    for (let j = left; j < right; j++) {
      colorKey[j] = 1;
      recordStep();

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep();
      }

      colorKey[j] = 0;
      recordStep();
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    colorKey[right] = 0;
    colorKey[i + 1] = 2;
    recordStep();

    return i + 1;
  };

  const quickSortRecursive = (arr, left, right) => {
    if (left < right) {
      const pivotIndex = partition(arr, left, right, colorKey);
      quickSortRecursive(arr, left, pivotIndex - 1);
      quickSortRecursive(arr, pivotIndex + 1, right);
    } else if (left === right) {
      colorKey[left] = 2;
      recordStep();
    }
  };

  quickSortRecursive(array, 0, array.length - 1);
  colorKey.fill(2);
  recordStep();
};

export default QuickSort;
