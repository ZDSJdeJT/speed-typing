export const formatPercentage = (percentage: number) =>
  `${percentage.toFixed(0)}%`;

export const countErrors = (actual: string, expected: string) =>
  expected
    .split('')
    .reduce(
      (errors, expectedChar, index) =>
        expectedChar !== actual[index] ? errors + 1 : errors,
      0,
    );

export const calculateAccuracyPercentage = (errors: number, total: number) =>
  total > 0 ? ((total - errors) / total) * 100 : 0;

export const formatSpeed = (speed: number) => `${speed.toFixed(0)}(WPM)`;

export const calculateSpeed = (totalTyped: number, seconds: number) =>
  totalTyped / 5 / (seconds / 60);
