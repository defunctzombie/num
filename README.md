[![Build Status](https://secure.travis-ci.org/defunctzombie/num.svg)](http://travis-ci.org/defunctzombie/num)

**num** is an arbitrary size fixed precision library written in javascript for node.js and browsers

Looking for just integers? Check out [int](https://github.com/defunctzombie/int)

```
npm install num
```

```javascript
var num = require('num');

// ordinary js floating point math
console.log(0.1 + 0.2); // 0.30000000000000004 :(

// with `num`
console.log(num(0.1).add(0.2).toString()); //'0.3'
```

## api ##

Besides the **num** function, all of the other methods operate on the objects returned by **num**

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

```
// note that `div` uses the precision of the numerator
num('1').div('3.0') -> 0
num('1.0').div('3') -> 0.3
```

### neg ###
> return a new num that is the negative

### abs ###
> return new num that is the absolute value

### abs ###
> return a new num that is the absolute value

### cmp (value) ###
> compare our value to {value}

> return 0 if self and value are equal, -1 if self < value, 1 if self > value

### lt (value) ###
> return true if self < value

### lte (value) ###
> return true if self <= value

### gt (value) ###
> return true if self > value

### gte (value) ###
> return true if self >= value

### eq (value) ###
> return true if self == value

### ne (value) ###
> return true if self != value

### set_precision (precision) ###

> set the precision for the number. Can be used to alter how many places after the decimal are relevant.

> return self
