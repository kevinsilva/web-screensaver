import Rectangle from '../Rectangle.js';
import Image from '../Image.js';

describe('Image', () => {
  describe('when it is created', () => {
    let img;
    let fakeElement;

    beforeEach(() => {
      fakeElement = {
        offsetWidth: 100,
        offsetHeight: 100,
        style: {
          top: '',
          left: '',
        },
      };
      img = new Image(fakeElement);
    });

    it('has a reference element', () => {
      expect(img.referenceElement).toBe(fakeElement);
    });

    it('it has a base rectangle positioned on X0 Y0', () => {
      expect(img.rectangle).toStrictEqual(new Rectangle(0, 0, 100, 100));
    });
  });

  it("updates it's position based on the rectangle whenever rendered", () => {
    const fakeElement = {
      offsetWidth: 100,
      offsetHeight: 100,
      style: {
        top: '',
        left: '',
      },
    };

    const img = new Image(fakeElement);
    img.rectangle.setX(100);
    img.rectangle.setY(100);
    img.render();

    expect(img.referenceElement.style.top).toEqual('100px');
    expect(img.referenceElement.style.left).toEqual('100px');
  });
});
