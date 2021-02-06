import { Idle, IEngine, IOperator } from '../src/interfaces'
import { validateValuesPerOperator } from '../src/validator'

export class Engine {
  private rules: IEngine.IRulesSchema<any>

  public status: IEngine.IContextStatus
  public context: IEngine.IContext<any>

  constructor() {
    this.rules = {}
    this.status = 'success'
    this.context = {}
  }

  /**
   * @method updateStats
   * @desc Checks the final status of tests if no errors are thrown.
   */
  private updateStats(): void {
    this.status = Object.keys(this.context).some(
      attribute => this.context[attribute].status === 'failed',
    )
      ? 'failed'
      : 'success'
  }

  /**
   * @method subscribe
   * @desc Register rules.
   * @param rules
   * @param facts
   */
  public subscribe<M>(
    rules: IEngine.IRules<M>,
    facts: IEngine.IFacts<M>,
  ): this {
    this.rules = rules(facts)

    Object.keys(this.rules).forEach(attribute => {
      const { condition, event } = this.rules[attribute]

      this.context[attribute] = {
        method: condition.method,
        status: !condition.result ? 'success' : 'failed',
        values: { sended: condition.values.a, expected: condition.values.b },
        event,
      }
    })

    return this
  }

  /**
   * @method validate
   * @desc Perform operator validation based on values.
   * @param operator
   * @param values
   */
  public validate(
    operator: IOperator.IOptions,
    values: Record<'a' | 'b', Idle>,
  ): this {
    validateValuesPerOperator(operator, values)

    return this
  }

  /**
   * @method run
   * @desc Run rule tests.
   */
  public run(): this {
    Object.keys(this.context).forEach(attribute => {
      const { event, ...context } = this.context[attribute]

      this.validate(context.method, {
        a: context.values.sended,
        b: context.values.expected,
      })

      if (context.status === 'failed' && typeof event === 'function') {
        try {
          event()
        } catch (error) {
          throw { ...context, error }
        }
      }
    })

    this.updateStats()

    return this
  }
}
