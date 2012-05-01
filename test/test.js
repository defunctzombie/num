
var assert = require('assert');
var num = require('../');

test('build', function() {
    // zeros
    assert.equal(num(0), '0');
    assert.equal(num('0'), '0');
    assert.equal(num('0.'), '0');
    assert.equal(num('.0'), '0.0');
    assert.equal(num('-.00'), '0.00');
    assert.equal(num('0.000'), '0.000');

    // whole number
    assert.equal(num(5), '5');
    assert.equal(num(-5), '-5');
    assert.equal(num('5'), '5');
    assert.equal(num('-5'), '-5');

    // misc
    assert.equal(num(1.2), '1.2');
    assert.equal(num(.2), '0.2');
    assert.equal(num(-.2), '-0.2');
    assert.equal(num(-1.2), '-1.2');
    assert.equal(num('0.001'), '0.001');
    assert.equal(num('0.001234'), '0.001234');
    assert.equal(num(123), '123');
    assert.equal(num(-234), '-234');

    // large numbers
    assert.equal(num('987654321987654321'), '987654321987654321');
    assert.equal(num('-987654321987654321.12345678901'), '-987654321987654321.12345678901');
    assert.equal(num('987654321987654321.12345678901'), '987654321987654321.12345678901');
    assert.equal(num('-.000098765432198765432112345678901'), '-0.000098765432198765432112345678901');
});

test('add', function() {
    assert.equal(num.add(0, 0), '0');
    assert.equal(num.add(-0, 0.0), '0');

    // presers precision
    assert.equal(num.add(1.2, -1.2), '0.0');

    // misc
    assert.equal(num.add(1.2, 2.4), '3.6');

    // large numbers
    assert.equal(num.add('987654321987654321.12345678901', 1000.012), '987654321987655321.13545678901');

    assert.equal(num.add('987654321987654321.12345678901', '-987654321987654321.12345678901'), '0.00000000000');
});

test('sub', function() {
    assert.equal(num.sub(0, 0), '0');
    assert.equal(num.sub('0', '-0'), '0');

    assert.equal(num.sub('1.0', '-1.0'), '2.0');

    assert.equal(num('987654321987654321.12345678901').sub(100.012), '987654321987654221.11145678901');
    assert.equal(num(100.012).sub(num('987654321987654321.12345678901')), '-987654321987654221.11145678901');
});

test('mul', function() {
    assert.equal(num.mul(1.2, 2.4), '2.88');
    assert.equal(num.mul(.2, 2.4), '0.48');
    assert.equal(num.mul(.2, 2), '0.4');
    assert.equal(num.mul(5, 2), '10');
    assert.equal(num.mul('123456789.32423455645', '123323.34343'), '15225104028597.7358269570716235');
});

test('precision', function() {
    assert.equal(num(1.999).set_precision(30), '1.999000000000000000000000000000');
    assert.equal(num(1.999).set_precision(1), '1.9');
    assert.equal(num(-1.999).set_precision(30), '-1.999000000000000000000000000000');
    assert.equal(num(-1.999).set_precision(1), '-2.0'); // TODO: is this correct behavior?
});

test('round', function() {
    assert.equal(num(123.999).round(30), '123.999');
    assert.equal(num(123.999).round(1), '124.0');
    assert.equal(num(123.450).round(1), '123.5');
    assert.equal(num(123.449).round(1), '123.4');
    assert.equal(num(123.495).round(2), '123.50');
    assert.equal(num(123.495).round(0), '123');
    assert.equal(num(123.500).round(0), '124');

    assert.equal(num(-123.999).round(30), '-123.999');
    assert.equal(num(-123.999).round(1), '-124.0');
    assert.equal(num(-123.450).round(1), '-123.5');
    assert.equal(num(-123.449).round(1), '-123.4');
    assert.equal(num(-123.495).round(2), '-123.50');
    assert.equal(num(-123.495).round(0), '-123');
    assert.equal(num(-123.500).round(0), '-124');

    assert.equal(num(0.999).round(30), '0.999');
    assert.equal(num(0.999).round(1), '1.0');
    assert.equal(num(0.450).round(1), '0.5');
    assert.equal(num(0.449).round(1), '0.4');
    assert.equal(num(0.495).round(2), '0.50');
    assert.equal(num(0.495).round(0), '0');

    assert.equal(num(-0.999).round(30), '-0.999');
    assert.equal(num(-0.999).round(1), '-1.0');
    assert.equal(num(-0.450).round(1), '-0.5');
    assert.equal(num(-0.449).round(1), '-0.4');
    assert.equal(num(-0.495).round(2), '-0.50');
    assert.equal(num(-0.495).round(0), '0');

    assert.equal(num('0.000').round(0), '0');
    assert.equal(num('0.000').round(1), '0.0');
});

/*
test('int_conv', function() {
    assert.equal(num.from_int(0, 0), '0');
    assert.equal(num.from_int(1, 0), '1');
    assert.equal(num.from_int(-1, 0), '-1');
    assert.equal(num.from_int(0, 5), '0.00000');
    assert.equal(num.from_int(1, 5), '0.00001');
    assert.equal(num.from_int(-1, 5), '-0.00001');
    assert.equal(num.from_int(123456, 5), '1.23456');
    assert.equal(num.from_int(-123456, 5), '-1.23456');

    assert.equal(num('0').to_int(1), 0);
    assert.equal(num('1').to_int(0), 1);
    assert.equal(num('1').to_int(2), 100);
    assert.equal(num('1.2345').to_int(5), 123450);
    assert.equal(num('-1.2345').to_int(5), -123450);
});

test('get_precision', function() {
    assert.equal(0, num('0').get_precision());
    assert.equal(2, num('0.20').get_precision());
    assert.equal(1, num('.5').get_precision());
});

test('to_int', function() {
    var d1 = num('12.35');
    assert.equal('1235', '' + d1.to_int(2));
    assert.equal('1235000', '' + d1.to_int(5));
    assert.equal('123', '' + d1.to_int(1));
});
*/
