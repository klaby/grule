import { IContext, IRules, Idle } from '../src/interfaces'
import { Event } from './event'
import { EngineError } from './exception'
import { Operator } from './operator'

export class Grule<T> {
  private metadata: T
  private context: IContext<T> = {} as IContext<T>

  constructor(metadata: T) {
    this.metadata = metadata
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
      this.context[attribute] = new Operator(this.metadata[attribute])
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
