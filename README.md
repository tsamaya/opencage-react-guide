# Using Opencage Gecoder API with REACT

## Overview

In this tutorial, we will discuss about integrating [Opencage](https://opencagedata.com/) API into a [React](https://reactjs.org/) application.

The prerequisites are, of course, a OpenCage API key, (if you don't have one, simply use this free registration [link](https://opencagedata.com/users/sign_up)), a [node](https://nodejs.org/) platform with [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/get-npm); and finally your favorite IDE or Text Editor.

We assume you are familiar with JavaScript. In this tutorial, we're going to use some ES6 features like [`arrow functions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [`classes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements.

This tutorial is not about setting up a build environment for React, so for the easy use, we will use [create-react-app](https://facebook.github.io/create-react-app/).

## Setup the environment

As current node version, when writing this guide, is 10.12; I assume you can use `npx` as it is available since version 5.2.

```bash
$ npx create-react-app opencage-react-app
```

it outputs :

```bash
Creating a new React app in [...]/opencage-react-app.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts...

yarn add v1.10.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 11 new dependencies.
info Direct dependencies
├─ react-dom@16.5.2
├─ react-scripts@2.0.5
└─ react@16.5.2
info All dependencies
├─ babel-plugin-dynamic-import-node@2.2.0
├─ babel-preset-react-app@5.0.4
├─ confusing-browser-globals@1.0.4
├─ eslint-config-react-app@3.0.4
├─ eslint-plugin-jsx-a11y@6.1.2
├─ object.assign@4.1.0
├─ react-dev-utils@6.0.5
├─ react-dom@16.5.2
├─ react-error-overlay@5.0.5
├─ react-scripts@2.0.5
└─ react@16.5.2
✨  Done in 79.89s.

Initialized a git repository.

Success! Created opencage-react-app at /Users/tsamaya/work/github/tsamaya/opencage-react-app
Inside that directory, you can run several commands:

  yarn start
    Starts the development server.

  yarn build
    Bundles the app into static files for production.

  yarn test
    Starts the test runner.

  yarn eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd opencage-react-app
  yarn start

Happy hacking!
```

Let's do the suggested commands

<!--  -->

```bash
$ cd opencage-react-app
$ yarn start
```

The project is built in development mode and it opens your favorite browser on http://localhost:3000.

![react-app-start](./resources/create-react-app-start.png)

The page will automatically reload if you make changes to the code. So let's do it.

First of all download [opencage svg logo](https://raw.githubusercontent.com/tsamaya/opencage-react-guide/master/resources/opencage-white.svg) and copy it to the `src/` folder

Open you IDE or Text Editor with the folder `opencage-react-app`.

Edit the file `./src/App.js`

replace

```js
import logo from './logo.svg';
```

with

```js
import logo from './opencage-white.svg';
```

The app is rebuilt and instead of the atomic react logo, you should now have a Open Cage logo.

use `CTRL + C` to stop the development server.

We will now add dependencies to the project.

First the style, you can pick up your favorite CSS framework (flexbox, bootstrap or material UI), for this tutorial I picked up [Bulma]() as it is javascript free, then no react wrapper is needed to keep this tutorial simple and focused only on opencage geocode API integration.

```bash
$ yarn add bulma
```

it outputs

```
yarn add v1.10.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...

success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
├─ bulma@0.7.2
├─ react-dom@16.5.2
└─ react@16.5.2
info All dependencies
├─ bulma@0.7.2
├─ react-dom@16.5.2
└─ react@16.5.2
✨  Done in 8.61s.
```

let's create an Header component: duplicate `App.js` as `Header.js`

Rename `App.css` into `Header.css`. Then edit `Header.css`, we will avoid being see sick with the infinite loop animation and place the center text in the header only. The header will be a header not whole view port page.

```css
/* ./src/Header.css */
.App {
}

.App-logo {
  animation: App-logo-spin 10s linear;
  height: 40vmin;
}

.App-header {
  text-align: center;
  background-color: #20b282;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

Edit `Header.js`:

```js
// ./src/Header.js
import React, { Component } from 'react';
import logo from './opencage-white.svg';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          OpenCage <b>Geocoder</b> API.
        </p>
      </header>
    );
  }
}

export default Header;
```

Edit `index.js`, adding

```js
import 'bulma/css/bulma.css';
```

after

```js
import './index.css';
```

now edit `App.js`

```js
import React, { Component } from 'react';

import Header from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="columns">
          <div className="column">1</div>
          <div className="column">2</div>
        </div>
      </div>
    );
  }
}

export default App;
```

Now add packages dependencies like the opencage API client, LeafletJS, and classnames:

```bash
$ yarn add opencage-api-client leaflet classnames
```

- [opencage-api-client](https://github.com/tsamaya/opencage-api-client) is the client API for Opencage Geocoder API
- [LeafletJS](https://leafletjs.com/) is the well-known web mapping API
- [classnames](https://github.com/JedWatson/classnames) is a javascript utility lib to help build className attributes

We can start the dev server with `$ yarn start`

For now the app looks like This
