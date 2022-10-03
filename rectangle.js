import { isNumberInRange } from "./utilities.js";

export default class Rectangle {
    constructor(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.setX(x);
        this.setY(y);
    }

    setX(x) {
        this.x = x;
        this.topLeft = { x: x };
        this.topRight = { x: x + this.width };
        this.bottomLeft = { x: x };
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
        // rect.topLeft.x >= colision.topLeft.x &&
        // rect.topLeft.x <= colision.topRight.x &&
        // rect.topLeft.y >= colision.topLeft.y &&
        // rect.topLeft.y <= colision.bottomRight.y
        );
    };
};

    //  Alternative to setX and setY

    //  this.setPosition(x, y);

    // setPosition(x, y) {
    //   this.x = x;
    //   this.y = y;
    //   this.topLeft = { x, y };
    //   this.topRight = { x: x + this.width, y };
    //   this.bottomLeft = { x, y: y + this.height };
    //   this.bottomRight = { x: x + this.width, y: y + this.height };
    // }



      //Previous constructor without method call
      // this.x = x;
      // this.y = y;
      // this.width = width;
      // this.height = height;
      // this.topLeft = { x, y };
      // this.topRight = { x: x + width, y };
      // this.bottomLeft = { x, y: y + height };
      // this.bottomRight = { x: x + width, y: y + height };

      //First Rectangle
      // class Rectangle {
      //   constructor(x, y, width, height) {
      //     this.x = x;
      //     this.y = y;
      //     this.width = width;
      //     this.height = height;
      //     this.topLeft = { x, y };
      //     this.topRight = { x: x + width, y };
      //     this.bottomLeft = { x, y: y + height };
      //     this.bottomRight = { x: x + width, y: y + height };
      //   }
    
      //   colidesWith(rect) {
      //     if (this.x > (rect.x - this.width) &&
      //     this.y > (rect.y - this.height) &&
      //     this.x < (rect.x + rect.width) &&
      //     this.y < (rect.y + rect.height)
      //     ) {
      //       return true; 
      //     } else {
      //       return false;
      //     }
      // }
     