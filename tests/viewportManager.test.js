import Rectangle from "../rectangle";
import ViewportManager from "../viewportManager";

describe("Viewport Manager", () => {
    it("can be initialized width and a height", () => {
        const screen = new ViewportManager(1600, 1200);

        expect(screen.width).toEqual(1600);
        expect(screen.height).toEqual(1200);
    });
    
    it("can position two rectangles in its boundaries", () => {
        const rectangleOne = new Rectangle(0, 0, 100, 100);
        const rectangleTwo = new Rectangle(0, 0, 150, 250);

        const screen = new ViewportManager(1600, 1200);

        screen.position(rectangleOne, rectangleTwo);

        expect(rectangleOne.x).not.toEqual(0);
        expect(rectangleOne.y).not.toEqual(0);
        expect(rectangleTwo.x).not.toEqual(0);
        expect(rectangleTwo.y).not.toEqual(0);
        expect(screen.withinBoundaries(rectangleOne)).toEqual(true);
        expect(screen.withinBoundaries(rectangleTwo)).toEqual(true);
    });

    it('can detect if a rectangle is in its boundaries', () => {
        const rectangles = [
          new Rectangle(0, 0, 100, 100), // at topLeft
          new Rectangle(1100, 0, 100, 100), // at topRight
          new Rectangle(0, 1500, 100, 100), // at bottomLeft
          new Rectangle(1100, 1500, 100, 100), // at bottomRight
          new Rectangle(600, 1500, 100, 100), // at bottom
          new Rectangle(0, 950, 100, 100), // at left
          new Rectangle(600, 0, 100, 100), // at top
          new Rectangle(1100, 950, 100, 100), // at right
        ];

        const screen = new ViewportManager(1200, 1600);

        rectangles.forEach((rect) => {
          expect(screen.withinBoundaries(rect)).toEqual(true);
        });
    });

    it('can detect if a rectangle is NOT in its boundaries', () => {
        const rectangles = [
          new Rectangle(-50, 0, 100, 100), // topLeft vertex outside boundaries
          new Rectangle(1200, 0, 100, 100), // topRight vertex outside boundaries
          new Rectangle(-50, 1500, 100, 100), // bottomLeft vertex outside boundaries
          new Rectangle(1200, 1500, 100, 100), // bottomRight vertex outside boundaries
          new Rectangle(600, 1550, 100, 100), // bottom side outside boundaries
          new Rectangle(-50, 950, 100, 100), // left side outside boundaries
          new Rectangle(600, -50, 100, 100), // top side outside boundaries
          new Rectangle(1550, 950, 100, 100), // right side outside boundaries
        ];
  
        const screen = new ViewportManager(1200, 1600);
  
        rectangles.forEach((rect) => {
          expect(screen.withinBoundaries(rect)).toEqual(false);
        });
    });

    it("can position two rectangles in random positions within its boundaries and without colision between them", () => {
        // ARRANGE
        const screen = new ViewportManager(1200, 1600);
        const rect1 = new Rectangle(0, 0, 100, 100);
        const rect2 = new Rectangle(50, 50, 300, 300);

        // ACT
        screen.position(rect1, rect2);

        // ASSERT
        expect(screen.withinBoundaries(rect1)).toEqual(true);
        expect(screen.withinBoundaries(rect2)).toEqual(true);
        expect(rect1.colidesWith(rect2)).toEqual(false);
    });
});