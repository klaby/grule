import { IContext, IRules, Idle } from '../src/interfaces'
import { Event } from './event'
import { EngineError } from './exception'
import { Operator } from './operator'

export class Grule<T> {
  private facts: T
  private context: IContext<T> = {} as IContext<T>

  constructor(facts: T) {
    this.facts = facts
  }

  /**
   * @method subscribe
   *
   * @desc Enter the rules for the informed facts.
   *
   * @param rules
   */
  private async subscribe(rules: IRules<T>): Promise<Idle[]> {
    const attributes = Object.keys(this.facts) as Idle[]

    if (!attributes.length) {
      throw new EngineError('No attributes defined in facts.')
    }

    attributes.forEach((attribute: keyof T) => {
      this.context[attribute] = new Operator(this.facts[attribute])
    })

    const wrapedRules = rules(this.context, new Event())
    const context = Object.keys(wrapedRules)

    context.forEach(attribute => {
      if (!attributes.includes(attribute)) {
        throw new EngineError(
          `There is no value defined in the facts for the rule "${attribute}".`,
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
