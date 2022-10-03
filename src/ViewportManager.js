import { isNumberInRange, getRandomNumberInRange } from './utilities.js';

export default class ViewportManager {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  position(rectangleOne, rectangleTwo) {
    rectangleOne.setX(
      getRandomNumberInRange(0, this.width - rectangleOne.width)
    );
    rectangleOne.setY(
      getRandomNumberInRange(0, this.height - rectangleOne.height)
    );

    rectangleTwo.setX(
      getRandomNumberInRange(0, this.width - rectangleTwo.width)
    );
    rectangleTwo.setY(
      getRandomNumberInRange(0, this.height - rectangleTwo.height)
    );

    while (rectangleOne.colidesWith(rectangleTwo)) {
      rectangleTwo.setX(
        getRandomNumberInRange(0, this.width - rectangleTwo.width)
      );
      rectangleTwo.setY(
        getRandomNumberInRange(0, this.height - rectangleTwo.height)
      );
    }
  }

  withinBoundaries(rectangle) {
    return (
      isNumberInRange(rectangle.x, 0, this.width - rectangle.width) &&
      isNumberInRange(rectangle.y, 0, this.height - rectangle.height)
    );
  }
}
