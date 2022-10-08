import Rectangle from '../Rectangle.js'
import HandImage from '../HandImage.js'

describe('Hand Image', () => {
  describe('when it is created', () => {
    let catchingHand
    let fakeElement

    beforeEach(() => {
      jest.useFakeTimers()
      fakeElement = {
        offsetWidth: 100,
        offsetHeight: 100,
        style: {
          top: '',
          left: ''
        }
      }
      catchingHand = new HandImage(fakeElement)
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('has a reference element', () => {
      expect(catchingHand.referenceElement).toBe(fakeElement)
    })

    it('it has a base rectangle positioned on X0 Y0', () => {
      expect(catchingHand.rectangle).toStrictEqual(
        new Rectangle(0, 0, 100, 100)
      )
    })

    it('starts in the open state', () => {
      expect(catchingHand.isOpen).toBe(true)
    })

    it('changes to closed state after 1000ms', () => {
      jest.advanceTimersByTime(1000) // avançar no tempo 1s
      expect(catchingHand.isOpen).toEqual(false)
    })

    it('changes back to open state after 2000ms', () => {
      jest.advanceTimersByTime(2000) // avançar no tempo 1s
      expect(catchingHand.isOpen).toEqual(true)
    })
  })

  it("updates it's position based on the rectangle whenever rendered", () => {
    const fakeElement = {
      offsetWidth: 100,
      offsetHeight: 100,
      style: {
        top: '',
        left: ''
      }
    }

    const catchingImage = new HandImage(fakeElement)
    catchingImage.rectangle.setX(100)
    catchingImage.rectangle.setY(100)
    catchingImage.render()

    expect(catchingImage.referenceElement.style.top).toEqual('100px')
    expect(catchingImage.referenceElement.style.left).toEqual('100px')
  })
})
