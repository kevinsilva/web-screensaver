export default class IntroManager {
  constructor (referenceElement) {
    this.referenceElement = referenceElement
  }

  show () {
    this.referenceElement.style.display = 'inline-block'
  }

  hide () {
    this.referenceElement.style.display = 'none'
  }
}
