import "./SortingVisualizer.css";
import { useCallback, useEffect, useRef, useState } from "react";
import SortingController from "../components/SortingController";
import Bar from "../components/Bar";
import { useSortingValue } from "../sortingContext";
import {
  generateRandomArray,
  NameOfSortingAlgorithm,
} from "../common/common.module";

const SortingVisualizer = () => {
  const [arraySteps, setArraySteps] = useState([]);
  const [colorSteps, setColorSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentArray, setCurrentArray] = useState([]);
  const [colorKey, setColorKey] = useState([]);
  const timeouts = useRef([]);

  const { array, setArray, algorithm, delay, arraySize, minNumber, maxNumber } =
    useSortingValue();

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  // Generate a new random array
  const handleRandomArray = useCallback(() => {
    clearTimeouts();
    const newArray = generateRandomArray(arraySize, minNumber, maxNumber);
    const blankKey = new Array(arraySize).fill(0);
    const steps = [];
    const nextColorSteps = [];
    NameOfSortingAlgorithm[algorithm](
      newArray.slice(),
      0,
      steps,
      nextColorSteps
    );

    setArray(newArray);
    setCurrentArray(newArray);
    setColorKey(blankKey);
    setArraySteps(steps);
    setColorSteps(nextColorSteps);
    setCurrentStep(0);
  }, [
    algorithm,
    arraySize,
    clearTimeouts,
    maxNumber,
    minNumber,
    setArray,
  ]);

  // Reset the array to the initial state
  const resetArray = useCallback(() => {
    clearTimeouts();
    setCurrentArray(array);
    setColorKey(new Array(array.length).fill(0));
    setCurrentStep(0);
  }, [array, clearTimeouts]);

  // Executes a specific sorting step
  const executeStep = useCallback((stepIndex) => {
    if (stepIndex >= arraySteps.length) return;
    setCurrentArray(arraySteps[stepIndex]);
    setColorKey(colorSteps[stepIndex]);
    setCurrentStep(stepIndex + 1);

    const timeout = setTimeout(() => {
      executeStep(stepIndex + 1);
    }, delay);
    timeouts.current.push(timeout);
  }, [arraySteps, colorSteps, delay]);

  // Handles the sorting animation
  const startSorting = useCallback(() => {
    clearTimeouts();
    executeStep(currentStep);
  }, [clearTimeouts, currentStep, executeStep]);

  // Show previous sorting step
  const previousStep = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
    setCurrentArray(arraySteps[currentStep - 1]);
    setColorKey(colorSteps[currentStep - 1]);
  };

  // Show next sorting step
  const nextStep = () => {
    if (currentStep >= arraySteps.length) return;
    setCurrentStep(currentStep + 1);
    setCurrentArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };

  // Handles effect when arraySize, delay, or algorithm changes
  useEffect(() => {
    if (array.length === 0 || array.length !== arraySize) {
      handleRandomArray();
    } else {
      resetArray();
    }
  }, [array, arraySize, delay, algorithm, handleRandomArray, resetArray]);
  useEffect(() => {
    // Cleanup function to clear timeouts when the component unmounts
    return () => {
      clearTimeouts();
    };
  }, [clearTimeouts]);

  return (
    <div className="app-child">
      <div className="frame">
        <div className="barsDiv container card">
          {currentArray.map((value, index) => (
            <Bar
              key={index}
              index={index}
              length={value}
              color={colorKey[index]}
            />
          ))}
        </div>

        <SortingController
          previousSteps={previousStep}
          nextSteps={nextStep}
          start={startSorting}
          stop={arraySteps.length === currentStep}
          resetSteps={resetArray}
          generate={handleRandomArray}
        />

        {/* Display the sorting steps */}
        <div className="sorting-steps">
          <h3>Initial Array:</h3>
          <div>
            {array.map((value, index) => (
              <span key={index} style={{ marginRight: "5px" }}>
                {value}
              </span>
            ))}
          </div>

          <h3>Steps Count:</h3>
          <div>
            {/* Ensure currentStep is within bounds before accessing arraySteps */}
            {currentStep < arraySteps.length && (
              arraySteps.slice(0, currentStep).map((step, index) => (
                <div key={index}>
                  {step.map((value, i) => (
                    <span key={i} style={{ marginRight: "5px" }}>
                      {value}
                    </span>
                  ))}
                </div>
              ))
            )}
          </div>

          <h3>Current Sorting Step:</h3>
          <div>
            {currentArray.map((value, index) => (
              <span key={index} style={{ marginRight: "5px" }}>
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
