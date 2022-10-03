import { isNumberInRange } from './utilities.js';

export default class Rectangle {
  constructor(x, y, width, height) {
    this.width = width;
    this.height = height;
    this.setX(x);
    this.setY(y);
  }

  setX(x) {
    this.x = x;
    this.topLeft = { x };
    this.topRight = { x: x + this.width };
    this.bottomLeft = { x };
    this.bottomRight = { x: x + this.width };
  }

  setY(y) {
    this.y = y;
    this.topLeft.y = y;
    this.topRight.y = y;
    this.bottomLeft.y = y + this.height;
    this.bottomRight.y = y + this.height;
  }

  colidesWith(rect) {
    const colision = new Rectangle(
      this.x - rect.width,
      this.y - rect.height,
      this.width + rect.width,
      this.height + rect.height
    );

    return (
      isNumberInRange(rect.x, colision.x, colision.topRight.x) &&
      isNumberInRange(rect.y, colision.y, colision.bottomRight.y)
    );
  }
}
