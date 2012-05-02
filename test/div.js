
var assert = require('assert');
var num = require('../');

test('div', function() {
    assert.equal(num(1).div(2), '0.5');
    assert.equal(num(1).div(20), '0.05');

    // TODO what should this really do?
    assert.equal(num(1).div(3), '0.3');
    assert.equal(num('1.000').div('3'), '0.333');
});

