import { swap } from "../common/common.module";

const selectionSort = (array, position, arraySteps, colorSteps) => {
    const colorKey = new Array(array.length).fill(0);
    const recordStep = () => {
        arraySteps.push(array.slice());
        colorSteps.push(colorKey.slice());
    };

    recordStep();

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        colorKey[minIndex] = 1;
        recordStep();

        for (let j = i + 1; j < array.length; j++) {
            colorKey[j] = 1;
            recordStep();

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }

            colorKey[j] = 0;
            recordStep();
        }

        if (minIndex !== i) {
            array = swap(array, i, minIndex);
            recordStep();
        }

        colorKey[i] = 2;
        colorKey[minIndex] = 0;
        recordStep();
    }

    colorKey.fill(2);
    recordStep();

    return;
};

export default selectionSort;
