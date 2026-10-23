const BucketSort = (array, position, arraySteps, colorSteps) => {
  const colorKey = new Array(array.length).fill(0);
  const recordStep = () => {
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  };

  recordStep();
  if (array.length === 0) {
    return;
  }

  const bucketCount = Math.ceil(Math.sqrt(array.length));
  const min = Math.min(...array);
  const max = Math.max(...array);
  const range = max - min;
  const buckets = Array.from({ length: bucketCount }, () => []);

  array.forEach((value, index) => {
    const bucketIndex =
      range === 0
        ? 0
        : Math.min(
            bucketCount - 1,
            Math.floor(((value - min) / range) * bucketCount)
          );
    buckets[bucketIndex].push(value);
    colorKey[index] = 1;
    recordStep();
    colorKey[index] = 0;
  });

  const sortedValues = buckets.flatMap((bucket) =>
    bucket.sort((left, right) => left - right)
  );

  sortedValues.forEach((value, index) => {
    array[index] = value;
    colorKey[index] = 2;
    recordStep();
  });

  colorKey.fill(2);
  recordStep();
};

export default BucketSort;
