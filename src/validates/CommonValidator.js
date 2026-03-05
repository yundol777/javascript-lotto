export function isInputEmpty(input) {
  return input === "";
}

export function isPositiveInteger(input) {
  return /^[1-9]\d*$/.test(input);
}
