# source-media-query-builder

> Build media-query for the `source` node with helpers

## Install

```bash
npm i source-media-query-builder
```

## Helpers

#### (feature < value) range

Easily build simple range

```js
const builder = require('source-media-query-builder')

// "(max-width: 399px)"
builder('(width<400px)')

// "(max-width: 400px)"
builder('(width<=400px)')

// "(width: 400px)"
builder('(width==400px)')

// "(min-width: 400px)"
builder('(width>=400px)')

// "(min-width: 401px)"
builder('(width>400px)')
```

#### (value < feature < value) range

Easily build multiple range

```js
const builder = require('source-media-query-builder')

// "(min-width: 301px) and (max-width: 399px)"
builder('(300px<width<400px)')

// "(max-width: 300px) and (min-width: 400px)"
builder('(300px>=width>=400px)')
```

#### (hd: bool) property

Easily target high or standard device pixel resolution

```js
const builder = require('source-media-query-builder')

// "(min-resolution: 144dpi)"
builder('(hd:true)')

// "(max-resolution: 96dpi)"
builder('(hd:false)')
```

## Example

```js
const builder = require('source-media-query-builder')

// "(width: 400px)"
builder('(width:400px)')

// "(min-width: 301px) and (max-width: 399px) and (min-resolution: 144dpi)"
builder('(300px<width<400px) and (hd:true)')

// "(max-width: 400px) and (max-resolution: 96dpi)'"
builder('(width<=400px) and (hd:false)')
```

## License

MIT
