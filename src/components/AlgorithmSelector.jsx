import { useRef, useState } from "react";
import { SortingType, useSortingValue } from "../sortingContext";
import { generateOptGroup, generateRandomArray } from "../common/common.module";
import "./AlgorithmSelector.css";

const explanations = {
  "Bubble Sort": "Compare neighboring numbers and swap them if they are out of order. Repeat passes until the largest remaining numbers have moved to the end.",
  "Insertion Sort": "Build a sorted prefix. Take the next number, shift larger numbers to the right, and insert it into the correct position.",
  "Selection Sort": "Find the smallest number in the unsorted portion and swap it into the next position. Repeat until all positions are sorted.",
  "Merge Sort": "Split the array into halves until each part has one number, then merge the parts by repeatedly taking the smaller next number.",
  "Quick Sort": "Choose the last number as a pivot. Move smaller numbers before it, place the pivot in its final position, then sort each side.",
  "Heap Sort": "Build a max heap with the largest number at its root. Move the root to the end, restore the heap, and repeat.",
  "Shell Sort": "Perform insertion-style passes over numbers separated by a gap. Shrink the gap until the final pass compares neighboring numbers.",
  "Counting Sort": "Count how often each integer occurs, then write the numbers back in increasing order using those counts.",
  "Radix Sort": "Group numbers by their ones digit, then tens digit, and so on. Each stable digit pass preserves the order from earlier passes.",
  "Bucket Sort": "Distribute numbers into value-range buckets, sort each bucket, and join the buckets in increasing range order.",
};

const AlgorithmSelector = () => {
  const { algorithm, applySettings } = useSortingValue();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);
  const [count, setCount] = useState("5");
  const [maximum, setMaximum] = useState("500");
  const [delay, setDelay] = useState("500");
  const [customNumbers, setCustomNumbers] = useState("");
  const [error, setError] = useState("");
  const dialog = useRef(null);
  const custom = customNumbers.trim().length > 0;

  const apply = (event) => {
    event.preventDefault();
    const animationDelay = Number(delay);
    if (delay.trim() === "" || !Number.isInteger(animationDelay) ||
        animationDelay < 0 || animationDelay > 10000) {
      setError("Delay must be a whole number from 0 to 10000 milliseconds.");
      return;
    }

    let numbers;
    if (custom) {
      const entries = customNumbers.trim().split(/[,\s]+/);
      if (entries.length > 500 || customNumbers.trim().startsWith(",") ||
          customNumbers.trim().endsWith(",") || /,\s*,/.test(customNumbers) ||
          entries.some((value) => !/^\d+$/.test(value) || Number(value) > 500)) {
        setError("Enter 1 to 500 whole numbers from 0 to 500, separated by commas or spaces.");
        return;
      }
      numbers = entries.map(Number);
    } else {
      if (count.trim() === "" || !Number.isInteger(Number(count)) ||
          Number(count) < 1 || Number(count) > 500) {
        setError("Array size must be a whole number from 1 to 500.");
        return;
      }
      if (maximum.trim() === "" || !Number.isInteger(Number(maximum)) ||
          Number(maximum) < 1 || Number(maximum) > 500) {
        setError("Maximum random value must be a whole number from 1 to 500.");
        return;
      }
      numbers = generateRandomArray(Number(count), 1, Number(maximum));
    }

    setError("");
    applySettings({
      numbers,
      selectedAlgorithm,
      animationDelay,
      maximum: custom ? Math.max(1, ...numbers) : Number(maximum),
    });
  };

  return (
    <aside className="algorithm-settings">
      <form onSubmit={apply} noValidate>
        <h2>Sorting settings</h2>
        <label htmlFor="algorithm">Algorithm</label>
        <select id="algorithm" value={selectedAlgorithm}
          onChange={(event) => setSelectedAlgorithm(event.target.value)}>
          {generateOptGroup(SortingType)}
        </select>

        <label htmlFor="custom-numbers">Custom numbers (optional)</label>
        <textarea id="custom-numbers" value={customNumbers}
          onChange={(event) => setCustomNumbers(event.target.value)}
          placeholder="12, 5, 30, 8" aria-describedby="custom-help" />
        <small id="custom-help">Whole numbers from 0 to 500. Leave blank for random numbers.</small>

        <fieldset disabled={custom}>
          <legend>Random array settings</legend>
          <label htmlFor="array-size">Array size (1-500)</label>
          <input id="array-size" type="number" min="1" max="500" step="1"
            value={count} onChange={(event) => setCount(event.target.value)} />
          <label htmlFor="maximum">Maximum random value (1-500)</label>
          <input id="maximum" type="number" min="1" max="500" step="1"
            value={maximum} onChange={(event) => setMaximum(event.target.value)} />
        </fieldset>

        <label htmlFor="delay">Step delay in milliseconds (0-10000)</label>
        <input id="delay" type="number" min="0" max="10000" step="1"
          value={delay} onChange={(event) => setDelay(event.target.value)} />
        {error && <p role="alert" className="settings-error">{error}</p>}
        <button type="submit">Apply algorithm</button>
        <button type="button" onClick={() => dialog.current.showModal()}>
          How does it work?
        </button>
      </form>

      <dialog ref={dialog} aria-labelledby="algorithm-explanation-title">
        <h2 id="algorithm-explanation-title">{selectedAlgorithm}</h2>
        <p>{explanations[selectedAlgorithm]}</p>
        <p>The animation shows recorded array states. Green marks processed or
          sorted positions; the final frame shows the complete sorted array.</p>
        <form method="dialog"><button autoFocus>Close</button></form>
      </dialog>
    </aside>
  );
};

export default AlgorithmSelector;
