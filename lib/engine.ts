import { Exception } from './exception'

export namespace IOperator {
  export type ILogic =
    | '$less'
    | '$lessOrEqual'
    | '$greater'
    | '$greaterOrEqual'
    | '$equal'
    | '$diff'

  export type IModifier = '$in' | '$notIn'
  export type IOptions = ILogic | IModifier

  export type ILess = number
  export type IGreater = number
  export type IEqual = number | boolean | string
  export type In = string | [] | Record<string, any>
  export type Idle = unknown | any

  export type IEval = {
    result: boolean
    method: IOptions
    values: { a: any; b: any }
  }

  export type IMethodsLogic = {
    [k in ILogic]: <A>(a: A, b: A) => IEval
  }

  export type IMethodsModifier = {
    [k in IModifier]: <A, B>(a: A, b: B) => IEval
  }

  export type IMethods = IMethodsLogic & IMethodsModifier
}

export namespace IDataType {
  export type IOptions =
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'
}

export namespace IEvents {
  export type IOptions = '$throw' | '$done'

  export type ISchema = {
    condition: IOperator.IEval
    event?: Function
  }

  export type IMethods = {
    $throw: (message: string) => Function
    $when: (condition: IOperator.IEval, event?: Function) => ISchema
  }
}

export namespace IEngine {
  export type IRulesSchema<T> = Record<keyof T, IEvents.ISchema>

  export type IRules<T> = (
    metadata: T,
    events: IEvents.IMethods,
    operators: IOperator.IMethods,
  ) => IRulesSchema<T>

  export type IFacts<T> = T

  export type IContextStatus = 'success' | 'failed'

  export type IContext<R> = {
    [k in keyof R]: {
      status: IContextStatus
      method: IOperator.IOptions | null
      values: {
        expected: any
        sended: any
      }
      event?: Function
    }
  }
}

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
   * @method operators
   *
   * @desc Operators.
   */
  private get operators(): IOperator.IMethods {
    return {
      $less: <V = IOperator.ILess>(a: V, b: V) => {
        return this.eval('$less', a < b, { a, b })
      },
      $lessOrEqual: <V = IOperator.ILess>(a: V, b: V) => {
        return this.eval('$lessOrEqual', a <= b, { a, b })
      },
      $greater: <V = IOperator.IGreater>(a: V, b: V) => {
        return this.eval('$greater', a > b, { a, b })
      },
      $greaterOrEqual: <V = IOperator.IGreater>(a: V, b: V) => {
        return this.eval('$greaterOrEqual', a > b, { a, b })
      },
      $equal: <V = IOperator.IEqual>(a: V, b: V) => {
        return this.eval('$equal', a === b, { a, b })
      },
      $diff: <V = IOperator.IEqual>(a: V, b: V) => {
        return this.eval('$diff', a !== b, { a, b })
      },
      $in: <V = IOperator.In>(a: V, b: IOperator.Idle) => {
        return this.eval('$in', (a as IOperator.Idle).includes(b), { a, b })
      },
      $notIn: <V = IOperator.In>(a: V, b: IOperator.Idle) => {
        return this.eval('$notIn', !(a as IOperator.Idle).includes(b), { a, b })
      },
    }
  }

  /**
   * @method events
   *
   * @desc Events.
   */
  private get events(): IEvents.IMethods {
    return {
      $when: (evaluation, event) => {
        return { condition: evaluation, event }
      },
      $throw: message => (): never => {
        throw new Exception(Engine.name, message)
      },
    }
  }

  /**
   * @method typeEquals
   *
   * @desc Check data type.
   *
   * @param options
   * @param value
   */
  private typeEquals<V>(
    options: IDataType.IOptions[],
    value: Record<'a' | 'b', V>,
  ): boolean {
    const types = {
      a: typeof value.a,
      b: typeof value.b,
    }

    return types.a !== types.b
      ? false
      : Object.values(types).every(type => options.includes(type))
  }

  /**
   * @method validate
   *
   * @desc Validates data entered for each operator call.
   *
   * @param method
   * @param values
   */
  private validate<V>(method: IOperator.IOptions, values: Record<'a' | 'b', V>): boolean {
    const check = (types: IDataType.IOptions[]): boolean => {
      const equals = this.typeEquals(types, values)

      if (!equals && !['$in', '$notIn'].includes(method)) {
        throw new Error(`Method "${method}" expects data type "${types.toString()}."`)
      }

      return true
    }

    switch (method) {
      case '$less':
      case '$lessOrEqual':
      case '$greater':
      case '$greaterOrEqual':
        return check(['number', 'bigint'])

      case '$equal':
      case '$diff':
        return check(['bigint', 'boolean', 'number', 'string'])

      case '$in':
      case '$notIn':
        return check(['string', 'object'])

      default:
        return true
    }
  }

  /**
   * @method eval
   *
   * @desc Evaluate operations.
   *
   * @param method
   * @param result
   * @param values
   */
  private eval<V>(
    method: IOperator.IOptions,
    result: boolean,
    values: Record<'a' | 'b', V>,
  ): IOperator.IEval {
    this.validate(method, values)

    return {
      result,
      method,
      values,
    }
  }

  /**
   * @method updateStats
   *
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
   *
   * @desc Register rules.
   *
   * @param rules
   * @param facts
   */
  subscribe<M>(rules: IEngine.IRules<M>, facts: IEngine.IFacts<M>): this {
    this.rules = rules(facts, this.events, this.operators)

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
   * @method run
   *
   * @desc Run rule tests.
   */
  run(): this {
    Object.keys(this.context).forEach(attribute => {
      const { event, ...context } = this.context[attribute]

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
