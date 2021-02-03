import { Exception } from './exception'

export namespace IEngine {
  export type IRuleMeta<M> = {
    condition(metadata: M): void
    consequence(): Partial<{ message: string }>
  }

  export type IRule<R = any> = Record<keyof R, IRuleMeta<R>>

  export type IFact<F = any> = F

  export type IError = Record<'message' | 'attribute' | 'value', string>

  export type IStatus = 'completed' | 'failed'

  export type IOptions = {
    throwError: boolean
  }

  export type IContext = {
    fact: Partial<Record<'key' | 'value', any>>
    consequence: Partial<{ message: string }>
  }
}

export class Engine {
  public errors: IEngine.IError[] = []

  protected rules: IEngine.IRule = {}
  protected facts: IEngine.IFact = {}
  protected context: IEngine.IContext = { fact: {}, consequence: {} }

  private options: IEngine.IOptions = {
    throwError: true,
  }

  /**
   * @function error
   *
   * @desc Generates a payload with failed validations.
   *
   * @param message
   * @param exception
   */
  private error(message?: string, exception = false) {
    const { fact, consequence } = this.context

    const error: IEngine.IError = {
      message: message || consequence.message || 'Validation failed.',
      attribute: fact.key,
      value: fact.value,
    }

    if (this.errors.length) {
      const index = this.errors.map(e => e.attribute).indexOf(error.attribute)
      this.errors.splice(index, 1, error)
    } else {
      this.errors.push(error)
    }

    if (exception) {
      throw new Error(error.message)
    }
  }

  /**
   * @method status
   *
   * @desc Retorna o status da validação.
   */
  public get status(): IEngine.IStatus {
    return !this.errors.length ? 'completed' : 'failed'
  }

  /**
   * @method when
   *
   * @desc Do something according to the condition.
   *
   * @param condition
   */
  public when(condition: boolean): this {
    const { throwError } = this.options

    if (!condition) {
      this.error('', throwError)
    }

    return this
  }

  /**
   * @method subscribe
   *
   * @desc Register rules and facts.
   *
   * @param rules
   * @param facts
   */
  public subscribe<M>(rules: IEngine.IRule<M>, facts: IEngine.IFact<M>): this {
    this.rules = { ...rules }
    this.facts = { ...facts }

    return this
  }

  /**
   * @method run
   *
   * @desc Run rule tests.
   *
   * @param options
   */
  public run(options?: Partial<IEngine.IOptions>): void {
    try {
      this.options = { ...this.options, ...options }

      if (!Object.keys(this.facts).length) return

      Object.entries(this.rules).forEach(([key, rule]) => {
        const value = this.facts[key] || null

        this.context = { fact: { key, value }, consequence: rule.consequence() }

        if (!value) {
          this.error(`Attribute (${key}) not informed.`, true)
        }

        rule.condition(this.facts)
      })
    } catch (error) {
      throw new Exception({ code: Engine.name, message: error.message })
    }
  }
}
