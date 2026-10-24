import { createContext, useContext, useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";

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
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState(SortingType.SIMPLE.BUBBLESORT);
  const [delay, setDelay] = useState(500);
  const [arraySize, setArraySize] = useState(5);
  const minNumber = 1;
  const maxNumber = 500;
  const handleArraySize = (size) => {
    setArraySize(Math.max(minNumber, Math.min(maxNumber, Number(size))));
  };
  const handleDelay = (Delay) => {
    setDelay(Math.max(maxNumber, Number(Delay)));
  };
  const changeArray = (index, value) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };
  return (
    <SortingContext.Provider
      value={{
        array,
        setArray,
        changeArray,
        algorithm,
        setAlgorithm,
        delay,
        handleDelay,
        arraySize,
        handleArraySize,
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

