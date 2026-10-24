# Sorting Visualizer

A React app for exploring how sorting algorithms work. Generate an integer
array, choose an algorithm, and follow its progress through the visualization
controls.

## Features

- Visualize 10 sorting algorithms:
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
  - Shell Sort
  - Counting Sort
  - Radix Sort
  - Bucket Sort
- Generate a new random array and adjust its size and animation delay.
- Step backward or forward, reset, or play the recorded sorting steps.
- Run automated algorithm tests for correctness and visualization-step data.

## Requirements

- Node.js and npm

## Run locally

```bash
npm ci
npm start
```

The development server opens at [http://localhost:3000](http://localhost:3000).

## Test and build

Run the automated test suite:

```bash
npm test -- --watchAll=false
```

Create an optimized production build:

```bash
npm run build
```

The automated algorithm tests are in
[`src/algorithms/algorithms.test.js`](src/algorithms/algorithms.test.js).
The broader test coverage checklist is in
[`TESTING_PLAN.md`](TESTING_PLAN.md).

## Algorithms and input notes

The current UI generates positive integer arrays. Counting Sort, Radix Sort,
and Bucket Sort have specific input constraints; negative-integer behavior is
not yet part of the supported UI workflow.

## Deployment

The app is configured for GitHub Pages at
[https://thearjunsharma-ai.github.io/Sorting-Visulizer](https://thearjunsharma-ai.github.io/Sorting-Visulizer).
Pushes to `main` run the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the app and deploys it to GitHub
Pages. Before the first deployment, enable Pages once in the repository:
**Settings → Pages → Build and deployment → Source → GitHub Actions**. The
workflow token cannot create a Pages site when Pages is disabled; after this
one-time setup, pushes to `main` can deploy normally.

## Contributing and reporting issues

Open a GitHub issue to report a problem or suggest an improvement. Pull
requests that include tests for algorithm or visualization changes are welcome.
