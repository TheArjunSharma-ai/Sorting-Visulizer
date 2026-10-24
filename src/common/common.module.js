import BubbleSort from "../algorithms/BubbleSort";
import insertionSort from "../algorithms/InsertionSort";
import selectionSort from "../algorithms/SelectionSort";
import MergeSort from "../algorithms/MergeSort";
import QuickSort from "../algorithms/QuickSort";
import HeapSort from "../algorithms/HeapSort";
import RadixSort from "../algorithms/RadixSort";
import CountingSort from "../algorithms/CountingSort";
import BucketSort from "../algorithms/BucketSort";
import ShellSort from "../algorithms/ShellSort";

export const generateOptGroup = (optgroups) => {
  return Object.keys(optgroups).map((category) => (
    <optgroup key={category} label={category.replace("_", " ")}>
      {generateOption(optgroups[category])}
    </optgroup>
  ));
};
export const generateOption = (options) => {
  return Object.keys(options).map((algoKey) => (
    <option key={algoKey} value={options[algoKey]}>
      {options[algoKey]}
    </option>
  ));
};

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomArray = (count, min, max) => {
  const temp = [];
  for (let i = 0; i < count; i++) {
    temp.push(generateRandomNumber(min, max));
  }
  return temp;
};
export function swap(array,i,j){
  let c = array[i];
  array[i] = array[j];
  array[j] = c;
  return array;
}

export const NameOfSortingAlgorithm = {
  "Bubble Sort": BubbleSort,
  "Insertion Sort": insertionSort,
  "Selection Sort": selectionSort,
  "Merge Sort": MergeSort,
  "Quick Sort": QuickSort,
  "Heap Sort": HeapSort,
  "Radix Sort": RadixSort,
  "Counting Sort": CountingSort,
  "Bucket Sort": BucketSort,
  "Shell Sort": ShellSort,
};
