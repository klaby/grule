import { IArgs, Idle, IOperatorsList } from '../src/interfaces'
import { Validator } from './validator'

export class Operator {
  private validator: Validator
  private arg0: Idle

  constructor(arg0: Idle) {
    this.validator = new Validator()
    this.arg0 = arg0
  }

  /**
   * @method $value
   *
   * @desc Value for arg0 defined in metadata.
   */
  public get $value(): Idle {
    return this.arg0
  }

  /**
   * @method args
   *
   * @desc Current context arguments.
   *
   * @param arg1
   */
  private args<A>(arg1: A): IArgs {
    return { arg0: this.arg0, arg1 }
  }

  /**
   * @method eval
   *
   * @desc Evaluated the operation in the current context.
   *
   * @param operator
   * @param arg1
   */
  public eval<A>(operator: Exclude<IOperatorsList, 'eval'>, arg1: A): boolean {
    return (this as Idle)[operator](arg1)
  }

  /**
   * @method less
   *
   * @desc Expression (arg0 < arg1)
   *
   * @param arg1
   */
  public less<A>(arg1: A) {
    this.validator.validate('less', this.args(arg1))
    return this.arg0 < arg1
  }

  /**
   * @method lessOrEqual
   *
   * @desc Expression (arg0 <= arg1)
   *
   * @param arg1
   */
  public lessOrEqual<A>(arg1: A) {
    this.validator.validate('lessOrEqual', this.args(arg1))
    return this.arg0 <= arg1
  }

  /**
   * @method greater
   *
   * @desc Expression (arg0 > arg1)
   *
   * @param arg1
   */
  public greater<A>(arg1: A) {
    this.validator.validate('greater', this.args(arg1))
    return this.arg0 > arg1
  }

  /**
   * @method greaterOrEqual
   *
   * @desc Expression (arg0 >= arg1)
   *
   * @param arg1
   */
  public greaterOrEqual<A>(arg1: A) {
    this.validator.validate('greaterOrEqual', this.args(arg1))
    return this.arg0 >= arg1
  }

  /**
   * @method equal
   *
   * @desc Expression (arg0 === arg1)
   *
   * @param arg1
   */
  public equal<A>(arg1: A) {
    this.validator.validate('equal', this.args(arg1))
    return this.arg0 === arg1
  }

  /**
   * @method diff
   *
   * @desc Expression (arg0 !== arg1)
   *
   * @param arg1
   */
  public diff<A>(arg1: A) {
    this.validator.validate('diff', this.args(arg1))
    return this.arg0 !== arg1
  }

  /**
   * @method in
   *
   * @desc Expression (arg1.includes(arg0))
   *
   * @param arg1
   */
  public in<A>(arg1: A) {
    this.validator.validate('in', this.args(arg1))
    return (arg1 as Idle).includes(this.arg0)
  }

  /**
   * @method notIn
   *
   * @desc Expression !(arg1.includes(arg0))
   *
   * @param arg1
   */
  public notIn<A>(arg1: A) {
    this.validator.validate('notIn', this.args(arg1))
    return !(arg1 as Idle).includes(this.arg0)
  }
}
