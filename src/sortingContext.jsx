import { createContext, useContext, useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";
import { generateRandomArray } from "./common/common.module";

// Rename sortingContext to SortingContext for consistency and proper naming convention
const SortingContext = createContext();

// Use sortingValue to access context in components that consume it
export const useSortingValue = () => {
  const value = useContext(SortingContext);
  if (!value) {
    throw new Error(
      "useSortingValue must be used within a SortingContextProvider"
    );
  }
  return value;
};

// SortingContext provider component
export function SortingContextProvider({ children }) {
  const [array, setArray] = useState(() => generateRandomArray(5, 1, 500));
  const [algorithm, setAlgorithm] = useState(SortingType.SIMPLE.BUBBLESORT);
  const [delay, setDelay] = useState(500);
  const [runId, setRunId] = useState(0);
  const minNumber = 1;
  const [maxNumber, setMaxNumber] = useState(500);
  const applySettings = ({ numbers, selectedAlgorithm, animationDelay, maximum }) => {
    setArray(numbers);
    setAlgorithm(selectedAlgorithm);
    setDelay(animationDelay);
    setMaxNumber(maximum);
    setRunId((id) => id + 1);
  };
  return (
    <SortingContext.Provider
      value={{
        array,
        setArray,
        applySettings,
        algorithm,
        delay,
        runId,
        minNumber,
        maxNumber,
      }}
    >
      <AlgorithmSelector />
      {children /* Now rendering the children prop */}
    </SortingContext.Provider>
  );
}

// Define sorting algorithms categories
export const SortingType = {
  SIMPLE: {
    BUBBLESORT: "Bubble Sort",
    INSERTIONSORT: "Insertion Sort",
    SELECTIONSORT: "Selection Sort",
  },
  EFFICIENT: {
    MERGESORT: "Merge Sort",
    QUICKSORT: "Quick Sort",
    HEAPSORT: "Heap Sort",
  },
  OTHER: {
    RADIXSORT: "Radix Sort",
    COUNTINGSORT: "Counting Sort",
    BUCKETSORT: "Bucket Sort",
    SHELLSORT: "Shell Sort",
  },
};
