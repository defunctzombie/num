
var assert = require('assert');
var num = require('../');

test('sub', function() {
    assert.equal(num.sub(0, 0), '0');
    assert.equal(num.sub('0', '-0'), '0');

    assert.equal(num.sub('1.0', '-1.0'), '2.0');

    assert.equal(num('987654321987654321.12345678901').sub(100.012), '987654321987654221.11145678901');
    assert.equal(num(100.012).sub(num('987654321987654321.12345678901')), '-987654321987654221.11145678901');
});

