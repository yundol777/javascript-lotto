export function commonValidate() {
  const isInputEmpty = input === "";
  const isPositiveInteger = /^[1-9]\d*$/.test(input);
  const isNumberInRange = Number(input) >= 1 && Number(input) <= 45;

  return isNumberInRange && !isInputEmpty && isPositiveInteger;
}

export function isNumberInRange(input) {
  return Number(input) >= 1 && Number(input) <= 45;
}

export function isInputEmpty(input) {
  return input === "";
}

export function isPositiveInteger(input) {
  return /^[1-9]\d*$/.test(input);
}

export function isArrayInLength(array, length) {
  return array.length === length;
}

export function isArrayUnique(array) {
  const uniqueSet = new Set(array);
  return uniqueSet.size === array.length;
}

export function isNumberInArray(number, array) {
  return array.includes(number);
}

export function isWinningNumbersExist(winningLottos) {
  return winningLottos;
}
