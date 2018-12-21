# nomi-error

the error middleware for nomi framework.

## Installation

``` bash
$ npm install nomi-error --save
```

Node.js >= 8.0.0  required.

## Usage

``` javascript

const error = require('nomi-error');
const Koa = require('koa');
const app = new Koa();
const options = {
  accepts: ['html', 'text', 'json']
}
app.use(error('html', 'text', 'json'));
```
