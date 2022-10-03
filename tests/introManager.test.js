import IntroManager from "../introManager.js"

describe("Intro Manager", () => {
    describe("when it is created", () => {
        let intro;
        let fakeElement;

        beforeEach(() => {
            fakeElement = {
                style: {
                    display: "none",
                    width: "100vw",
                    height: "100vh"
                }
            };
            intro = new IntroManager(fakeElement);
        });

        it("has a reference element", () => {
            expect(intro.referenceElement).toBe(fakeElement);
        });

        it("has a width of 100vh and a height of 100vh", () => {
            expect(intro.referenceElement.style.width).toEqual("100vw");
            expect(intro.referenceElement.style.height).toEqual("100vh");
        });
        
        it("has a display property set to none", () => {
            expect(intro.referenceElement.style.display).toEqual("none");
        });
    });

    it("updates it's display property to inline-block whenever the show method is called", () => {
        const fakeElement = {
            style: {
                display: "none",
                width: "100vw",
                height: "100vh"
            }
        };

        const intro = new IntroManager(fakeElement);
        intro.show();

        expect(intro.referenceElement.style.display).toEqual("inline-block");
    });
});