import {
  IContext,
  IRules,
  Idle,
  IRulesContext,
  IOperators,
} from '../src/interfaces'
import { Validator } from './validator'
import { Event } from './event'
import { Exception } from './exception'

export class Engine<T> {
  private metadata: T
  private rules: IRulesContext<T> = {} as IRulesContext<T>
  private context: IContext<T> = {} as IContext<T>
  private validator: Validator

  constructor(metadata: T) {
    this.metadata = metadata
    this.validator = new Validator()
  }

  /**
   * @method createOperatorsFor
   *
   * @desc Create a schema of operators for each mapped attribute.
   *
   * @param a
   */
  private createOperatorsFor<A extends Idle>(a: A): IOperators {
    return {
      less: <B>(b: B) => {
        this.validator.validate('less', { a, b })
        return a < b
      },
      lessOrEqual: <B>(b: B) => {
        this.validator.validate('lessOrEqual', { a, b })
        return a <= b
      },
      greater: <B>(b: B) => {
        this.validator.validate('greater', { a, b })
        return a > b
      },
      greaterOrEqual: <B>(b: B) => {
        this.validator.validate('greaterOrEqual', { a, b })
        return a >= b
      },
      equal: <B>(b: B) => {
        this.validator.validate('equal', { a, b })
        return a === b
      },
      diff: <B>(b: B) => {
        this.validator.validate('diff', { a, b })
        return a !== b
      },
      in: <B>(b: B) => {
        this.validator.validate('in', { a: b, b: a })
        return (b as Idle).includes(a)
      },
      notIn: <B>(b: B) => {
        this.validator.validate('notIn', { a: b, b: a })
        return !(b as Idle).includes(a)
      },
    }
  }

  /**
   * @method subscribe
   *
   * @desc Enter the rules for the informed metadata.
   *
   * @param rules
   */
  public subscribe(rules: IRules<T>): this {
    const attributes: Idle[] = Object.keys(this.metadata)

    attributes.forEach((attribute: keyof T) => {
      const value = this.metadata[attribute]

      this.context[attribute] = {
        $value: value,
        ...this.createOperatorsFor(value),
      }
    })

    this.rules = rules(this.context, new Event())

    return this
  }

  /**
   * @method run
   *
   * @desc Run the test stack for the defined rules.
   */
  public run(): boolean {
    const attributes: Idle[] = Object.keys(this.context)

    attributes.forEach((attribute: keyof T) => {
      if (this.rules[attribute] === undefined) {
        throw new Exception(
          Engine.name,
          `No rules defined for the "${attribute}" attribute.`,
        )
      }
    })

    return Object.values(this.rules).every(result => !!result)
  }
}
