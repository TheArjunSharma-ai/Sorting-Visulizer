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
- Enter custom numbers, or leave the field blank to generate a random array.
- Set the random array size, maximum random value, and animation delay.
- Click **Apply algorithm** to start sorting with the chosen settings.
- Open **How does it work?** for an explanation of the selected algorithm.
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

Enter up to 500 whole numbers from 0 to 500, separated by commas or spaces,
in **Custom numbers**. When supplied, these values take priority and disable
the random-array controls. Bars display values read-only; edit your input in
the custom-numbers field and click **Apply algorithm** again to restart.

When custom input is blank, the app generates 1 to 500 random numbers, each
between 1 and the configured maximum (inclusive, up to 500). The step delay
accepts whole milliseconds from 0 to 10000 independently of the maximum value.
Settings are applied only when you submit the form, so clearing and retyping
a number does not interrupt playback. Invalid values display a validation
message without replacing the current array. Negative and fractional numbers
are not supported.

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
