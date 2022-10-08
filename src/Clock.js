import Rectangle from './Rectangle.js'

export default class Clock {
  constructor (referenceElement) {
    this.referenceElement = referenceElement
    this.updateTime()
    this.rectangle = new Rectangle(
      0,
      0,
      referenceElement.offsetWidth,
      referenceElement.offsetHeight
    )
  }

  render () {
    this.updateTime()
    this.referenceElement.style.top = this.rectangle.y + 'px'
    this.referenceElement.style.left = this.rectangle.x + 'px'
  }

  updateTime () {
    this.referenceElement.innerText = new Date().toLocaleTimeString()
  }
}
