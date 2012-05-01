var int = require('int');

function Num(num, precision) {
    if (!(this instanceof Num)) {
        return new Num(num, precision);
    }

    var self = this;
    if (num instanceof Num) {
        self._int = int(num._int);
        self._precision = num._precision;
        return self;
    }

    // convert to a string
    num = '' + num;

    // find Num point
    var dec = num.indexOf('.');

    if (dec >= 0) {
        // take out the Num point
        num = num.replace('.', '');
        var precision = num.length - dec;
    }
    else {
        var precision = 0;
    }

    this._int = int(num);
    this._precision = precision;
}

// TODO: this is probably slow, make faster
Num.prototype.toString = function() {
    var num_str = this._int.toString();

    var sign = '';
    if (num_str.charAt(0) === '-') {
        sign = '-';
    }

    if (this._precision === 0) {
        return num_str;
    }

    var arr = num_str.split('');
    arr.splice(arr.length - this._precision, 0, '.');
    return sign + arr.join('');
};

Num.prototype.valueOf = Num.prototype.toString;

/// return {int} the precision
Num.prototype.get_precision = function() {
    return this._precision;
};

/// setting precision to < current precision will floor, NOT round
/// modifies this object
Num.prototype.set_precision = function(precision) {
    var self = this;
    var precision_diff = precision - self._precision;

    if (precision_diff > 0) {
        self._int = self._int.mul(int(10).pow(precision_diff));
    }
    else if(precision_diff < 0) {
        self._int = self._int.div(int(10).pow(-precision_diff));
    }

    self._precision += precision_diff;
    return self;
};

/// returns a copy
Num.prototype.round = function(precision) {
    var copy = Num(this);

    if (precision >= copy._precision) {
        return copy;
    }

    var num_str = copy._int.toString();

    // the index to check for rounding
    var idx = num_str.length - copy._precision + precision;

    // the number to check if >= 5
    var n = num_str[idx] - 0;

    var neg = num_str[0] === '-';

    copy.set_precision(precision);

    if ((neg && n < 5) || (!neg && n >= 5)) {
        copy._int = copy._int.add(1);
    }

    return copy;
};

/// returns new Num, -this
Num.prototype.neg = function() {
    return new Num(this._int.neg(), this._precision);
};

Num.prototype.to_int = function(precision) {
    var copy = this.copy();
    copy.set_precision(precision);
    return copy._int;
};

/// converts a Num to an integer representation with specified precision
/// Num('32.1').to_int(5) will be converted to 3210000
/// for doing fast calculations before converting back with Num.from_int
/// warning! cannot convert more than ~16 total Num digits of precision
Num.prototype.to_int = function(precision) {
    var dec_str = this.round(precision).toString();
    return Math.round(dec_str * Math.pow(10, precision));
};

/// returns a + b
/// a, b can each be either a Num, String, or Number
/// will return a new Num with the greatest precision of the operands
Num.add = function(a, b) {
    // force a,b to be Num
    if(!(a instanceof Num))
        a = Num(a);
    if(!(b instanceof Num))
        b = Num(b);

    // make sure num and a have the same precision
    if(a._precision < b._precision) {
        a = a.copy(); // copy before modifying
        a.set_precision(b._precision);
    } else if(b._precision < a._precision) {
        b = b.copy(); // copy before modifying
        b.set_precision(a._precision);
    }

    // the integer result
    var num_res = a._int.add(b._int);

    return new Num(num_res, a._precision);
};

/// returns a - b
/// a, b can each be either a Num, String, or Number
/// will return a new Num with the greatest precision of the operands
Num.sub = function(a, b) {
    b = Num(b); // convert/copy before modifying
    b._int = b._int.neg(); // negate
    return Num.add(a, b);
};

/// returns a * b
/// a, b can each be either a Num, String, or Number
/// will return a new Num with precision = sum(a.precision,b.precision)
Num.mul = function(a, b) {
    // force a,b to be Num
    if(!(a instanceof Num))
        a = Num(a);
    if(!(b instanceof Num))
        b = Num(b);

    return new Num(a._int.mul(b._int), a._precision + b._precision);
};

/// returns < 0 if a < b, 0 if a == b, > 0 if a > b
Num.cmp = function(a, b) {
    // force a,b to be Num
    if(!(a instanceof Num))
        a = Num(a);
    if(!(b instanceof Num))
        b = Num(b);

    return a.sub(b).toNumber();
};

Num.eq = function(a, b) {
    return Num.cmp(a, b) === 0;
};

Num.gt = function(a, b) {
    return Num.cmp(a, b) > 0;
};

Num.gte = function(a, b) {
    return Num.cmp(a, b) >= 0;
};

Num.lt = function(a, b) {
    return Num.cmp(a, b) < 0;
};

Num.lte = function(a, b) {
    return Num.cmp(a, b) <= 0;
};

// add all the static methods in Num to Num's prototype
(function() {
    function add_method(name) {
        Num.prototype[name] = function(b) {
            return Num[name](this, b);
        }
    }

    for(var i in Num) {
        add_method(i);
    }
})();

module.exports = Num;
