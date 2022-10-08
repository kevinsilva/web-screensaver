import UserActivityManager from '../UserActivityManager'

describe('UserActivityManager', () => {
  let uam
  let handleOverLimit
  let handleUserActive

  beforeEach(() => {
    jest.useFakeTimers()
    handleOverLimit = jest.fn()
    handleUserActive = jest.fn()
    uam = new UserActivityManager(handleOverLimit, handleUserActive)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('can be initialised with the absent time in ms', () => {
    expect(uam.absentTimeLimit).toEqual(3000)
  })

  it('is under the absent time limit', () => {
    expect(uam.isOverLimit).toEqual(false)
  })

  it('is over the limit after the absent time limit has passed and calls the given callback', () => {
    expect(uam.isOverLimit).toEqual(false)
    jest.advanceTimersByTime(4000) // 4 seconds
    expect(uam.isOverLimit).toEqual(true)
    expect(handleOverLimit).toHaveBeenCalled()
  })

  it('stops being over the limit when an user event triggers and then calls the given active user callback', () => {
    jest.advanceTimersByTime(4000) // 4 seconds
    expect(uam.isOverLimit).toEqual(true)

    const event = new KeyboardEvent('keypress', { keycode: 37 })

    document.dispatchEvent(event)

    expect(handleUserActive).toHaveBeenCalled()
    expect(uam.isOverLimit).toEqual(false)
  })
})
