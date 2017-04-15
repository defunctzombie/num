
var assert = require('assert');
var num = require('../');

test('valueOf', function() {
    assert.equal(num(123).valueOf(), 123);
    assert.equal(num(-3.1415).valueOf(), -3.1415);
    assert.equal(num(123) + 123, 246);
    assert.equal(num(123) * 2, 246);
    assert.equal(num(123) / 2, 61.5);
    assert.equal(num(123) - 123, 0);

    assert.equal(num('3.14'), 3.14);
    assert.ok(num('3.14') == 3.14);

    assert.equal(num('9223372036854775808'), 9223372036854776000);
    assert.ok(num('9223372036854775808') == 9223372036854776000);
});

