const isNumberInRange = (number, min, max) => number >= min && number <= max;

const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export { isNumberInRange, getRandomNumberInRange };