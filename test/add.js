
var assert = require('assert');
var num = require('../');

test('add', function() {
    assert.equal(num(0).add(0), '0');
    assert.equal(num(-0).add(0.0), '0');

    // preserve precision
    assert.equal(num(1.2).add(-1.2), '0.0');

    // misc
    assert.equal(num(1.2).add(2.4), '3.6');

    // large numbers
    assert.equal(num('987654321987654321.12345678901').add(1000.012), '987654321987655321.13545678901');

    assert.equal(num('987654321987654321.12345678901').add('-987654321987654321.12345678901'), '0.00000000000');
});

