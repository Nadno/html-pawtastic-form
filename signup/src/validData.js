export const validPattern = (pattern, value) => () => new RegExp(pattern).test(value);
export const isEqual = (firstValue, secondValue) => () => firstValue === secondValue;
export const lessOrEqualThan = (firstValue, secondValue) => () =>
  firstValue <= secondValue;
export const biggerOrEqualThan = (firstValue, secondValue) => () =>
  firstValue >= secondValue;
export const notNull = (value) => () => value.trim() !== "";