import { swap } from "../common/common.module";

const BubbleSort = (array, position, arraySteps, colorSteps) => {
  const colorKey = new Array(array.length).fill(0);
  arraySteps.push(array.slice());
  colorSteps.push(colorKey.slice());

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
      }
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());
      colorKey[j + 1] = 0;
      colorKey[j] = 0;
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());
    }
    colorKey[array.length - 1 - i] = 2;
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }

  colorKey.fill(2);
  arraySteps.push(array.slice());
  colorSteps.push(colorKey.slice());
  return;
};

export default BubbleSort;
