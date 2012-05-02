[![Build Status](https://secure.travis-ci.org/shtylman/node-num.png)](http://travis-ci.org/shtylman/node-num)

### Unleash all the numbers!! ###

**num** is an arbitrary size fixed precision library written in pure javascript. Why? Because once you write one library you want to write all the libraries.

Looking for just integers? Check out **int** at shtylman/node-int

## quick and dirty ##

```
npm install num
```

```javascript
var num = require('num');

var foo = int('0.1').add('0.2');

// did it work?
console.log(foo.toString());
//'0.3' hell yea
```

## api ##

Besides the **num** function, all of the other methods operate on the objects returned by **int**

### num (value) ###
> construct a new decimal

> valid values are integers, numbers, or strings

### add (value) ###
> add {value} to our number and return a new num

### sub (value) ###
> subtract {value} from our number and return a new num

### mul (value) ###
> multiply our num by {value} and return a new num

### div (value) ###
> divide our num by {value} and return a new num

### pow (value) ###
> raise our num by {value} and return a new num
