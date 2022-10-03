# Web Screensaver

A screensaver on a webpage that reminds you of the passage of time.

![preview](others/web_screensaver.gif)

After a period of user inactivity, a clock and an image of a hand appear in an arbitrary, visible position of the screen. They constantly reposition themselves without ever overlapping. When user activity is detected, the screensaver disappears and only restarts after another period of user inactivity.

## Implementation Details

After the initial problem thinking clarification, the approach was broken down into two main separation of tasks: solving the geometric problem of the reposition of elements without overlap, and secondly, the implementation of the binary state associated with the user activity.

The geometric problem was simplified by abstracting the variable forms of the elements into rectangles. By taking one of the vertexes as a point of reference, it was possible to establish the coordinate values for the other vertexes. This data, tested using [Jest](https://jestjs.io/), was crucial to prevent the overlap using a zone of collision - formed by summing the perimeters of the rectangles. The respective coordinates are calculated, horizontally, by subtracting the x coordinate value of the point of reference from the length of the other rectangle. In the same logical sequence, the y coordinate value of the same reference point is subtracted by the height of the other rectangle. Thus, each class object _Rectangle_, defined by x and y coordinates, length and height; has a _collidesWith_ method that makes use of the class itself to create a collision rectangle and detect if there is an overlap. In that scenario, the elements, sharing attributes from the rectangles, are repositioned within screen boundaries by the class _ViewportManager_ until there is no overlap.

For the screensaver to start, there must be no user activity for a set period of time. In the same way, for it to finish its exhibition, there must be user activity. The responsibility for establishing that state, called _isOverLimit_, and managing the consequences rests with the class _UserActivityManager_. When the class is called, a _setTimeout_ counter is started, and the detection of user activity starts. If there is no activity detection until the completion of the counter time limit, then the _isOverLimit_ status changes to true, and the callback function to start the screensaver is called. On the other hand, in case of user activity, the state _isOverLimit_ is set false, resetting the timeout and calling the callback function that stops the screensaver.

Due to the encapsulation and export of the ES6 class modules, the code present in the main file, _index.html_, is nothing more than the sequential and logical use of the listed processes.

## Usage

Import the `Clock`, `HandImage`, `ViewportManager`,`UserActivityManager` and `IntroManager` classes from `src` directory.

Create new instances of the _Clock_, the _Image_ and the _IntroManager_ with corresponding document elements as arguments.

```js
const clock = new Clock(document.getElementById("screen-saver__clock"));
const handImg = new HandImage(document.getElementById("screen-saver__img"));
const intro = new IntroManager(document.querySelector(".screen-saver__intro"));
```

In order to set the viewport as a boundary for the screensaver's elements, create a new instance of the _ViewportManager_ with `document.documentElement.clientWidth` and `document.documentElement.clientHeight` as arguments.

```js
const viewPortManager = new ViewportManager(
  document.documentElement.clientWidth,
  document.documentElement.clientHeight
);
```

Create a new instance of the _UserActivityManager_, with the first argument as a callback to run the screensaver and the second argument as a callback to stop the screensaver.

```js
const userActivityManager = new UserActivityManager(
  runScreenSaver,
  stopScreenSaver
);
```

Declare a variable to be assigned as _setInterval_ and _clearInterval_ of the positioning and rendering of the elements.

```js
let positionAndRenderInterval;

const runScreenSaver = () => {
  intro.show();
  document.getElementById("screen-saver").style.opacity = 1;
  positionAndRenderInterval = setInterval(positionAndRender, 3000);
};

const stopScreenSaver = () => {
  document.getElementById("screen-saver").style.opacity = 0;
  clearInterval(positionAndRenderInterval);
};
```

Finally, _setInterval_ on the clock's rendering.

```js
setInterval(() => clock.render(), 1000);
```

> **! Notes**
>
> To display a different image, import the Image class instead of the HandImage.
>
> To remove the introduction, simply do not instantiate an IntroManager class.

I did not include a production bundle because it was not part of my focus for this project.

## Development

To install the component, clone repository, change into directory on the terminal and install with npm.

```http
git clone <repository-url>
cd web_screensaver
npm install
```

Add this to `package.json` scripts property.

```js
"scripts": {
  "test": "jest --env=jsdom"
},
"babel": {
  "env": {
    "test": {
      "plugins": [
        "@babel/plugin-transform-modules-commonjs"
      ]
    }
  }
},
```

To run the tests.

```http
  npm test <file>
```

## Credits

Big thanks to my mentor 🎓, [William R. J. Ribeiro](https://github.com/williamrjribeiro/), and to my teammate, André Christofori.

Images by [Icons8.com](https://icons8.com/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
