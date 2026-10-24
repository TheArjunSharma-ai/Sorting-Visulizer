# Sorting Visualizer Testing Plan

## Current algorithm coverage

The selector and dispatcher currently include Bubble, Insertion, Selection,
Merge, Quick, Heap, Radix, Counting, Bucket, and Shell Sort. The automated
algorithm suite in `src/algorithms/algorithms.test.js` verifies each algorithm
against empty, single-element, two-element, sorted, reverse-sorted, duplicate,
all-equal, multi-digit, and zero-containing integer inputs. It checks the final
sorted output, preservation of the input values, and the dimensions and
alignment of the recorded array/color steps.

The integration suite in `src/components/AlgorithmSelector.test.jsx` covers
custom input with all 10 algorithms, random generation including its maximum
value, editing draft settings, validation errors, custom-input priority,
reapplying during playback, reset, unmount cleanup, and explanation dialogs.

## Test execution

1. Run `npm test -- --watchAll=false` to execute the algorithm tests.
2. Run `npm run build` to check the production bundle.
3. In the browser, select every algorithm and verify the bars and step display
   update correctly.
4. Exercise generate, previous, next, reset, and autoplay controls; repeat after
   changing algorithm, array size, and delay.
5. Check array-size and delay inputs with empty, zero, negative, decimal, and
   unusually large values, confirming that the actual limits match the intended
   UI behavior.

## Follow-up cases

- Extend component tests for manual previous/next navigation.
- Test randomized arrays across all algorithms and compare with a numeric
  reference sort.
- Decide whether Counting Sort, Radix Sort, and Bucket Sort should support
  negative integers. The current UI rejects negatives and fractions, and accepts
  custom integers from 0 to 500.
- Consider adding Cocktail Shaker Sort, TimSort, or IntroSort as additional
  algorithm choices. They are not currently implemented, so they are not part
  of the current algorithm test suite.
