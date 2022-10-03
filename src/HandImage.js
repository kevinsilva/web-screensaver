import Rectangle from "./Rectangle.js";

export default class HandImage {
  constructor(referenceElement) {
    this.referenceElement = referenceElement;
    this.rectangle = new Rectangle(
      0,
      0,
      referenceElement.offsetWidth,
      referenceElement.offsetHeight
    );
    this.isOpen = true;

    setInterval(() => {
      this.catch();
    }, 1000);
  }

  render() {
    let randomSide = Math.random() < 0.5 ? -1 : 1;
    this.referenceElement.style.transform = "scaleX(" + randomSide + ")";

    this.referenceElement.style.top = this.rectangle.y + "px";
    this.referenceElement.style.left = this.rectangle.x + "px";
  }

  catch() {
    if (this.isOpen) {
      this.referenceElement.src = "/others/open.png";
      this.isOpen = false;
    } else {
      this.referenceElement.src = "/others/closed.png";
      this.isOpen = true;
    }
  }
}
