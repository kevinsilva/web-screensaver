import { isNumberInRange, getRandomNumberInRange } from '../utilities.js'

describe('isNumberInRange', () => {
  it('returns true if a given number is within a given min and max inclusive range', () => {
    // isNumberInRange(value, min, max)
    expect(isNumberInRange(1, 0, 3)).toBe(true)
    expect(isNumberInRange(2, 0, 3)).toBe(true)
    expect(isNumberInRange(3, 0, 3)).toBe(true)

    expect(isNumberInRange(4, 0, 3)).toBe(false)
    expect(isNumberInRange(-1, 0, 3)).toBe(false)

    expect(isNumberInRange(-2, -3, -1)).toBe(true)
    expect(isNumberInRange(-3, -3, -1)).toBe(true)
    expect(isNumberInRange(0, -3, -1)).toBe(false)
    expect(isNumberInRange(-4, -3, -1)).toBe(false)
  })
})

describe('getRandomNumberInRange', () => {
  it('generates a random number within a given min and max inclusive range', () => {
    for (let i = 0; i < 100; i++) {
      const randomNumber = getRandomNumberInRange(4, 10) // min, max
      expect(randomNumber).toBeGreaterThanOrEqual(4)
      expect(randomNumber).toBeLessThanOrEqual(10)
    }
  })
})
