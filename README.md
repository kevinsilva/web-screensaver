# Web Screensaver

A screensaver on a webpage that reminds you of the passage of time.

![preview](/others/web_screensaver.gif)

After a period of user inactivity, a clock and an image of a hand appear in an arbitrary, visible position of the screen. They constantly reposition themselves without ever overlapping. When user activity is detected, the screensaver disappears and only restarts after another period of user inactivity.

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-success?style=flat-square&logo=codesandbox)](https://codesandbox.io/p/github/kevinsilva/web-screensaver/main?file=%2FREADME.md&workspace=%257B%2522activeFilepath%2522%253A%2522%252FREADME.md%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clgf08u6j000x3b6ifkz02ntd%2522%253A%257B%2522key%2522%253A%2522clgf08u6j000x3b6ifkz02ntd%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A8080%252C%2522key%2522%253A%2522clgf0u3m900783b6ipw0wge4p%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522clgf0u2k3004n3b6iykvt4evk%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clgf08u6j000x3b6ifkz02ntd%2522%252C%2522spacesOrder%2522%253A%255B%2522clgf08u6j000x3b6ifkz02ntd%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

## Implementation Details

After the initial problem thinking clarification, the approach was broken down into two main separation of tasks: solving the geometric problem of the reposition of elements without overlap, and secondly, the implementation of the binary state associated with the user activity.

The geometric problem was simplified by abstracting the variable forms of the elements into rectangles. By taking one of the vertexes as a point of reference, it was possible to establish the coordinate values for the other vertexes. This data, tested using [Jest](https://jestjs.io/), was crucial to prevent the overlap using a zone of collision - formed by summing the perimeters of the rectangles. The respective coordinates are calculated, horizontally, by subtracting the x coordinate value of the point of reference from the length of the other rectangle. In the same logical sequence, the y coordinate value of the same reference point is subtracted by the height of the other rectangle. Thus, each class object _Rectangle_, defined by x and y coordinates, length and height; has a _collidesWith_ method that makes use of the class itself to create a collision rectangle and detect if there is an overlap. In that scenario, the elements, sharing attributes from the rectangles, are repositioned within screen boundaries by the class _ViewportManager_ until there is no overlap.

For the screensaver to start, there must be no user activity for a set period of time. In the same way, for it to finish its exhibition, there must be user activity. The responsibility for establishing that state, called _isOverLimit_, and managing the consequences rests with the class _UserActivityManager_. When the class is called, a _setTimeout_ counter is started, and the detection of user activity starts. If there is no activity detection until the completion of the counter time limit, then the _isOverLimit_ status changes to true, and the callback function to start the screensaver is called. On the other hand, in case of user activity, the state _isOverLimit_ is set false, resetting the timeout and calling the callback function that stops the screensaver.

Due to the encapsulation and export of the ES6 class modules, the code present in the main file, _index.html_, is nothing more than the sequential and logical use of the listed processes.

## Usage

Import the `Clock`, `HandImage`, `ViewportManager`,`UserActivityManager` and `IntroManager` classes from local directory.

Create new instances of the _Clock_, the _Image_ and the _IntroManager_ with corresponding document elements as arguments.

```js
const clock = new Clock(document.getElementById('screen-saver__clock'));
const handImg = new HandImage(document.getElementById('screen-saver__img'));
const intro = new IntroManager(document.querySelector('.screen-saver__intro'));
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
  document.getElementById('screen-saver').style.opacity = 1;
  positionAndRenderInterval = setInterval(positionAndRender, 3000);
};

const stopScreenSaver = () => {
  document.getElementById('screen-saver').style.opacity = 0;
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

```bash
git clone https://github.com/kevinsilva/web-screensaver
cd web_screensaver
npm install
```

To run the application.

```bash
  npm run dev
```

To run the tests.

```bash
  npm test <file>
```

## Credits

Big thanks to my mentor 🎓, [William R. J. Ribeiro](https://github.com/williamrjribeiro/), and to my teammate, André Christofori.

Images by [Icons8.com](https://icons8.com/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
