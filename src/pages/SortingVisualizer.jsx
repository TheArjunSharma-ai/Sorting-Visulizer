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

  const { array, setArray, algorithm, delay, runId, minNumber, maxNumber } =
    useSortingValue();

  // Clear all timeouts
  const clearTimeouts = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);

  // Generate a new random array
  const handleRandomArray = useCallback(() => {
    clearTimeouts();
    setArray(generateRandomArray(array.length, minNumber, maxNumber));
  }, [
    array.length,
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
    clearTimeouts();
    if (currentStep === 0) return;
    const nextIndex = currentStep - 1;
    setCurrentStep(nextIndex);
    setCurrentArray(nextIndex === 0 ? array : arraySteps[nextIndex - 1]);
    setColorKey(nextIndex === 0
      ? new Array(array.length).fill(0)
      : colorSteps[nextIndex - 1]);
  };

  // Show next sorting step
  const nextStep = () => {
    clearTimeouts();
    if (currentStep >= arraySteps.length) return;
    setCurrentStep(currentStep + 1);
    setCurrentArray(arraySteps[currentStep]);
    setColorKey(colorSteps[currentStep]);
  };

  useEffect(() => {
    clearTimeouts();
    const steps = [];
    const colors = [];
    NameOfSortingAlgorithm[algorithm](array.slice(), 0, steps, colors);
    setArraySteps(steps);
    setColorSteps(colors);
    setCurrentArray(array);
    setColorKey(new Array(array.length).fill(0));
    setCurrentStep(0);
    return clearTimeouts;
  }, [array, algorithm, runId, clearTimeouts]);

  useEffect(() => {
    if (runId > 0 && arraySteps.length > 0) {
      executeStep(0);
    }
    return clearTimeouts;
  }, [arraySteps, runId, executeStep, clearTimeouts]);

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
