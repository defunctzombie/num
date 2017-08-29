// Type definitions for num 0.3.0
// Project: https://github.com/defunctzombie/num
// Definitions by: Michael Rojas <https://github.com/havelessbemore>

declare namespace num {

  export interface Num {
    (value: number | string | Num): Num;
    new (value: number | string | Num): Num;
  }

  export class Num {

    constructor(value: number | string | Num);

    // add {value} to our number and return a new num
    add(value: number | string | Num): Num;

    // subtract {value} from our number and return a new num
    subtract(value: number | string | Num): Num;

    // multiply our num by {value} and return a new num
    mul(value: number | string | Num): Num;

    // divide our num by {value} and return a new num
    // note that `div` uses the precision of the numerator
    //    num('1').div('3.0') -> 0
    //    num('1.0').div('3') -> 0.3
    div(value: number | string | Num): Num;

    // return a new num that is the negative
    neg(value: number | string | Num): Num;

    // return a new num that is the absolute value
    abs(value: number | string | Num): Num;

    // compare our value to {value}. Return:
    //    0 if self and value are equal
    //    -1 if self < value
    //    1 if self > value
    cmp(value: number | string | Num): -1 | 0 | 1;

    // return true if self < value
    lt(value: number | string | Num): boolean;

    // return true if self <= value
    lte(value: number | string | Num): boolean;

    // return true if self > value
    gt(value: number | string | Num): boolean;

    // return true if self >= value
    gte(value: number | string | Num): boolean;

    // return true if self == value
    eq(value: number | string | Num): boolean;

    // return true if self != value
    ne(value: number | string | Num): boolean;

    // set the precision for the number. Can be used to alter
    // how many places after the decimal are relevant. Returns self
    set_precision(precision: number): Num;
  }
}
declare var Num: num.Num;
export = Num;
