import { IContext, IRules, Idle, IOperatorsList } from '../src/interfaces'
import { Validator } from './validator'
import { Event } from './event'
import { EngineError } from './exception'

export class Engine<T> {
  private metadata: T
  private context: IContext<T> = {} as IContext<T>
  private validator: Validator

  constructor(metadata: T) {
    this.metadata = metadata
    this.validator = new Validator()
  }

  /**
   * @method createContextfor
   *
   * @desc Create a schema of operators for each mapped attribute.
   *
   * @param a
   */
  private createContextfor<A extends Idle>(attribute: keyof T, a: A): boolean {
    const context = {
      eval: <B>(operator: Exclude<IOperatorsList, 'eval'>, b: B): boolean => {
        return this.context[attribute][operator](b as Idle)
      },
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
        this.validator.validate('in', { a, b })
        return (b as Idle).includes(a)
      },
      notIn: <B>(b: B) => {
        this.validator.validate('notIn', { a, b })
        return !(b as Idle).includes(a)
      },
    }

    this.context[attribute] = { ...context, $value: a }

    return true
  }

  /**
   * @method subscribe
   *
   * @desc Enter the rules for the informed metadata.
   *
   * @param rules
   */
  private async subscribe(rules: IRules<T>): Promise<Idle[]> {
    const attributes = Object.keys(this.metadata) as Idle[]

    if (!attributes.length) {
      throw new EngineError('No attributes defined in metadata.')
    }

    attributes.forEach((attribute: keyof T) => {
      const value = this.metadata[attribute]
      this.createContextfor(attribute, value)
    })

    const wrapedRules = rules(this.context, new Event())
    const context = Object.keys(wrapedRules)

    context.forEach(attribute => {
      if (!attributes.includes(attribute)) {
        throw new EngineError(
          `There is no value defined in the metadata for the rule "${attribute}".`,
        )
      }
    })

    return await Promise.all(Object.values(wrapedRules))
  }

  /**
   * @method run
   *
   * @desc Run the test stack for the defined rules.
   *
   * @param rules
   */
  public async run(rules: IRules<T>): Promise<boolean> {
    const result = await this.subscribe(rules)

    return Object.values(result).every(status =>
      [undefined, true].includes(status),
    )
  }
}
