import Clock from '../Clock.js'
import Rectangle from '../Rectangle.js'

describe('Clock', () => {
  describe('when it is created', () => {
    let clock
    let fakeElement

    beforeEach(() => {
      fakeElement = {
        offsetWidth: 100,
        offsetHeight: 100,
        innerText: '',
        style: {
          top: '',
          left: ''
        }
      }
      clock = new Clock(fakeElement)
    })

    it('has a reference element', () => {
      expect(clock.referenceElement).toBe(fakeElement)
    })

    it('renders the local time', () => {
      const time = new Date().toLocaleTimeString()
      expect(clock.referenceElement.innerText).toEqual(time)
    })

    it('has a base rectangle positioned on X0 Y0', () => {
      expect(clock.rectangle).toStrictEqual(new Rectangle(0, 0, 100, 100))
    })
  })

  it("updates it's position based on the rectangle and updates time whenever it is rendered", () => {
    const fakeElement = {
      offsetWidth: 100,
      offsetHeight: 100,
      innerText: '',
      style: {
        top: '',
        left: ''
      }
    }

    const clock = new Clock(fakeElement)
    clock.rectangle.setX(100)
    clock.rectangle.setY(100)
    clock.render()

    expect(clock.referenceElement.style.top).toEqual('100px')
    expect(clock.referenceElement.style.left).toEqual('100px')
    expect(clock.referenceElement.innerText).not.toEqual('')
  })
})
