import BubbleSort from "./BubbleSort";
import BucketSort from "./BucketSort";
import CountingSort from "./CountingSort";
import HeapSort from "./HeapSort";
import insertionSort from "./InsertionSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import RadixSort from "./RadixSort";
import selectionSort from "./SelectionSort";
import ShellSort from "./ShellSort";

const algorithms = [
  ["Bubble Sort", BubbleSort],
  ["Bucket Sort", BucketSort],
  ["Counting Sort", CountingSort],
  ["Heap Sort", HeapSort],
  ["Insertion Sort", insertionSort],
  ["Merge Sort", MergeSort],
  ["Quick Sort", QuickSort],
  ["Radix Sort", RadixSort],
  ["Selection Sort", selectionSort],
  ["Shell Sort", ShellSort],
];

const inputs = [
  ["empty", []],
  ["single element", [7]],
  ["two elements", [9, 2]],
  ["already sorted", [1, 2, 3, 4, 5]],
  ["reverse sorted", [5, 4, 3, 2, 1]],
  ["duplicates", [4, 2, 4, 1, 2, 1]],
  ["all equal", [3, 3, 3, 3]],
  ["multiple digit values", [91, 10, 501, 32, 8, 100]],
  ["zero values", [0, 5, 0, 2]],
];

describe.each(algorithms)("%s", (_name, sort) => {
  test.each(inputs)("sorts %s input and records aligned steps", (_caseName, input) => {
    const array = input.slice();
    const arraySteps = [];
    const colorSteps = [];

    sort(array, 0, arraySteps, colorSteps);

    const expected = input.slice().sort((left, right) => left - right);
    const finalArray = arraySteps[arraySteps.length - 1];

    expect(finalArray).toEqual(expected);
    expect(array.slice().sort((left, right) => left - right)).toEqual(
      input.slice().sort((left, right) => left - right)
    );
    expect(arraySteps).toHaveLength(colorSteps.length);
    arraySteps.forEach((step, index) => {
      expect(step).toHaveLength(input.length);
      expect(colorSteps[index]).toHaveLength(input.length);
    });
  });
});
