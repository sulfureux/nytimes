# A news collection of ${topic} at NYTimes.

## Introduction

A simple website to display a list news getting from free NYTimes API.

## Development

Stack: `react`, `react-router`, `redux`, `axios`, `bootstrap`, ... view all at [package.json](package.json)
### Environment

We need:

- Nodejs 8+
- yarn

### Install dependencies

```
$ yarn
```

### Start dev

```
$ yarn run dev
```

### Testing

Files:

```
src/**/**.test.js // Unit test
src/**/**.ui.test.jsx // UI test
```

```
$ yarn run test
```

## Production

### Build

```
$ yarn -production=true
$ yarn run build
```

### Deploy

```
```

## Source tree

```
.env
src
├───actions
├───assets
├───components
├───pages
├───reducers
├───scripts
├───styles
└───templates
```

### `.env`

App's configuration, can choose your `${topic}` at NYTimes by the way: edit `COLLECTION=` at this file. Also can change title and main API key of app at here.

### `src`

Root of this app, contain:

- `index.js` the first file, everything comes from here.
- `App.jsx` - the root component of app
- subfolders - the organization of the directory tree of all content that makes up this website, see below.

### `src/actions`

All actions that this app needs. Based on the theory of Redux architecture.

### `src/assets`

Contain all resources this app needs.

### `src/components`

Contain `React`'s components.

### `src/pages`

Contain app's pages.

### `src/reducers`

Contain `Redux`'s reducers. Based on the theory of Redux architecture.

### `src/scripts`

JS libs, contain functions that the app needs to run.

### `src/styles`

Most style files follow their `component` (in my opinion - like: `News.jsx` and `News.scss`). This place contains only special style files.

### `src/templates`

Contain html templates of the app.

## License

Temp no license @pierreneter
