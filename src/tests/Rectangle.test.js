import Rectangle from "../Rectangle.js";

describe("Rectangle", () => {
  it("it can be initialized with x, y, width and height", () => {
    const rect = new Rectangle(0, 0, 100, 50);

    expect(rect.x).toEqual(0);
    expect(rect.y).toEqual(0);
    expect(rect.width).toEqual(100);
    expect(rect.height).toEqual(50);
  });

  it("has top left coordenates", () => {
    let rect = new Rectangle(0, 0, 100, 50);
    expect(rect.topLeft.x).toEqual(0);
    expect(rect.topLeft.y).toEqual(0);

    rect = new Rectangle(20, 30, 100, 50);
    expect(rect.topLeft.x).toEqual(20);
    expect(rect.topLeft.y).toEqual(30);
  });

  it("has top right coordenates", () => {
    let rect = new Rectangle(0, 0, 100, 50);
    expect(rect.topRight.x).toEqual(100);
    expect(rect.topRight.y).toEqual(0);

    rect = new Rectangle(20, 30, 100, 50);
    expect(rect.topRight.x).toEqual(120);
    expect(rect.topRight.y).toEqual(30);
  });

  it("has bottom left coordinates", () => {
    let rect = new Rectangle(0, 0, 100, 50);
    expect(rect.bottomLeft.x).toEqual(0);
    expect(rect.bottomLeft.y).toEqual(50);

    rect = new Rectangle(20, 30, 100, 50);
    expect(rect.bottomLeft.x).toEqual(20);
    expect(rect.bottomLeft.y).toEqual(80);
  });

  it("has bottom right coordinates", () => {
    let rect = new Rectangle(0, 0, 100, 50);
    expect(rect.bottomRight.x).toEqual(100);
    expect(rect.bottomRight.y).toEqual(50);

    rect = new Rectangle(20, 30, 100, 50);
    expect(rect.bottomRight.x).toEqual(120);
    expect(rect.bottomRight.y).toEqual(80);
  });

  it("can detect colision with other rectangles", () => {
    const rectangles = [
      new Rectangle(175, 175, 50, 50), // topLeft vertex colides
      new Rectangle(75, 175, 50, 50), // topRight vertex colides
      new Rectangle(75, 75, 50, 50), // bottomRight vertex colides
      new Rectangle(175, 75, 50, 50), // bottomLeft vertex colides
      new Rectangle(125, 75, 50, 50), // bottom side colides
      new Rectangle(175, 125, 50, 50), // left side colides
      new Rectangle(125, 175, 50, 50), // top side colides
      new Rectangle(75, 125, 50, 50), // right side colides
      new Rectangle(125, 125, 50, 50), // contained
    ];

    const rect1 = new Rectangle(100, 100, 100, 100);

    rectangles.forEach((rect) => {
      expect(rect1.colidesWith(rect)).toEqual(true);
      expect(rect.colidesWith(rect1)).toEqual(true);
    });
  });

  it("can detect NO colision with other rectangles", () => {
    const rectangles = [
      new Rectangle(0, 0, 50, 50), // at topLeft
      new Rectangle(225, 0, 50, 50), // at topRight
      new Rectangle(225, 225, 50, 50), // at bottomRight
      new Rectangle(0, 225, 50, 50), // at bottomLeft
      new Rectangle(125, 225, 50, 50), // at bottom
      new Rectangle(0, 125, 50, 50), // at left
      new Rectangle(125, 0, 50, 50), // at top
      new Rectangle(225, 125, 50, 50), // at right
    ];

    const rect1 = new Rectangle(100, 100, 100, 100);

    rectangles.forEach((rect) => {
      expect(rect1.colidesWith(rect)).toEqual(false);
      expect(rect.colidesWith(rect1)).toEqual(false);
    });
  });

  it("updates all vertices whenever x or y changes", () => {
    const rect1 = new Rectangle(0, 0, 100, 100);

    rect1.setX(100);
    expect(rect1.topLeft.x).toEqual(100);
    expect(rect1.topRight.x).toEqual(200);
    expect(rect1.bottomLeft.x).toEqual(100);
    expect(rect1.bottomRight.x).toEqual(200);
  });
});
