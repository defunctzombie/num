
var assert = require('assert');
var num = require('../');

test('toString', function() {
    assert.equal(num('12345678912345.6789123456789').toString(), '12345678912345.6789123456789');
});

