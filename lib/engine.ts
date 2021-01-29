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
}

export class Engine {
  private rules: IEngine.IRule = {}

  private fact: Record<'key' | 'value', any> = { key: '', value: '' }

  private consequence: Partial<{ message: string }> = {}

  private options: IEngine.IOptions = {
    throwError: true,
  }

  public errors: IEngine.IError[] = []

  /**
   * @method status
   *
   * @desc Retorna o status da validação.
   */
  public get status(): IEngine.IStatus {
    return !this.errors.length ? 'completed' : 'failed'
  }

  /**
   * @method throw
   *
   * @desc Throws an exception if the rule's conditions are not met.
   */
  private throw(): this {
    const { throwError } = this.options

    const error: IEngine.IError = {
      message: this.consequence.message || 'Validation failed.',
      attribute: this.fact.key,
      value: this.fact.value,
    }

    this.errors.push(error)

    if (throwError) throw error

    return this
  }

  /**
   * @method when
   *
   * @desc Do something according to the condition.
   *
   * @param condition
   */
  public when(condition: boolean): this {
    if (!condition) {
      this.throw()
    }

    return this
  }

  /**
   * @method run
   *
   * @desc Run rule tests.
   *
   * @param rules
   * @param fact
   * @param options
   */
  public run<M>(
    rules: IEngine.IRule<M>,
    fact: IEngine.IFact<M>,
    options?: Partial<IEngine.IOptions>,
  ): void {
    this.rules = { ...rules }
    this.options = { ...this.options, ...options }

    if (!Object.keys(fact).length) return

    Object.entries(this.rules).forEach(([key, rule]) => {
      this.fact = { key, value: (fact as any)[key] }
      this.consequence = rule.consequence()

      rule.condition(fact)
    })
  }
}
