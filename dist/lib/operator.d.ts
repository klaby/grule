import { Idle, IOperatorsList } from '../src/interfaces';
export declare class Operator {
    private validator;
    private arg0;
    constructor(arg0: Idle);
    /**
     * @method $value
     *
     * @desc Value for arg0 defined in metadata.
     */
    get $value(): Idle;
    /**
     * @method args
     *
     * @desc Current context arguments.
     *
     * @param arg1
     */
    private args;
    /**
     * @method eval
     *
     * @desc Evaluated the operation in the current context.
     *
     * @param operator
     * @param arg1
     */
    eval<A>(operator: Exclude<IOperatorsList, 'eval'>, arg1: A): boolean;
    /**
     * @method less
     *
     * @desc Expression (arg0 < arg1)
     *
     * @param arg1
     */
    less<A>(arg1: A): boolean;
    /**
     * @method lessOrEqual
     *
     * @desc Expression (arg0 <= arg1)
     *
     * @param arg1
     */
    lessOrEqual<A>(arg1: A): boolean;
    /**
     * @method greater
     *
     * @desc Expression (arg0 > arg1)
     *
     * @param arg1
     */
    greater<A>(arg1: A): boolean;
    /**
     * @method greaterOrEqual
     *
     * @desc Expression (arg0 >= arg1)
     *
     * @param arg1
     */
    greaterOrEqual<A>(arg1: A): boolean;
    /**
     * @method equal
     *
     * @desc Expression (arg0 === arg1)
     *
     * @param arg1
     */
    equal<A>(arg1: A): boolean;
    /**
     * @method diff
     *
     * @desc Expression (arg0 !== arg1)
     *
     * @param arg1
     */
    diff<A>(arg1: A): boolean;
    /**
     * @method in
     *
     * @desc Expression (arg1.includes(arg0))
     *
     * @param arg1
     */
    in<A>(arg1: A): any;
    /**
     * @method notIn
     *
     * @desc Expression !(arg1.includes(arg0))
     *
     * @param arg1
     */
    notIn<A>(arg1: A): boolean;
}
