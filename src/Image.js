import Rectangle from './Rectangle.js'

export default class Image {
  constructor (referenceElement) {
    this.referenceElement = referenceElement
    this.rectangle = new Rectangle(
      0,
      0,
      referenceElement.offsetWidth,
      referenceElement.offsetHeight
    )
  }

  render () {
    this.referenceElement.style.top = this.rectangle.y + 'px'
    this.referenceElement.style.left = this.rectangle.x + 'px'
  }
}
