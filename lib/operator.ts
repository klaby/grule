import { typeCheck } from 'type-check'
import { evalAsync, parse } from 'expression-eval'
import { Exception } from './exception'

export namespace IDataType {
  export type IValue<T = any> = Record<'$a' | '$b', T>

  export type ILess = IValue<number>

  export type IGreater = IValue<number>

  export type IEqual = IValue<number | boolean | string>

  export type IDiff = IValue<number | boolean | string>

  export type IIn = IValue<string | [] | Record<string, any>>

  export type IPrimitive = 'String' | 'Array' | 'Object' | 'Number' | 'Boolean'

  export type IOptions = 'string' | 'number' | 'json' | 'array' | 'bool'

  export type IOptionsSchema = Record<IOptions, IPrimitive>
}

export namespace IOperator {
  export type IMethods =
    | '$less'
    | '$lessOrEqual'
    | '$greater'
    | '$greaterOrEqual'
    | '$equal'
    | '$diff'
    | '$in'
    | '$notIn'

  export type IModifier = 'includes'

  export type IProps = {
    datatype: IDataType.IOptions[]
    expression: string
  }

  export type ISchema = Record<IMethods, IProps>

  export type IContext = {
    method: IMethods
    values: IDataType.IValue
    data: {
      type: IDataType.IOptions
      equals: boolean
    }
  }
}

export const OPERATORS: IOperator.ISchema = {
  $less: {
    datatype: ['number'],
    expression: '$a < $b',
  },
  $lessOrEqual: {
    datatype: ['number'],
    expression: '$a <= $b',
  },
  $greater: {
    datatype: ['number'],
    expression: '$a > $b',
  },
  $greaterOrEqual: {
    datatype: ['number'],
    expression: '$a >= $b',
  },
  $equal: {
    datatype: ['number', 'string', 'bool', 'array', 'json'],
    expression: '$a === $b',
  },
  $diff: {
    datatype: ['number', 'string', 'bool', 'array', 'json'],
    expression: '$a !== $b',
  },
  $in: {
    datatype: ['json', 'string', 'array'],
    expression: '$a.includes($b)',
  },
  $notIn: {
    datatype: ['json', 'string', 'array'],
    expression: '!$a.includes($b)',
  },
}

export const DATA_TYPE_SCHEMAS: IDataType.IOptionsSchema = {
  array: 'Array',
  bool: 'Boolean',
  json: 'Object',
  number: 'Number',
  string: 'String',
}

export class Operator {
  private context: IOperator.IContext = {} as IOperator.IContext

  /**
   * @method isArrayOrJSON
   *
   * @desc Checks whether the reported value is an Array or JSON.
   *
   * @param dataType
   */
  public isArrayOrJSON(dataType: IDataType.IOptions): boolean {
    return ['array', 'json'].includes(dataType)
  }

  /**
   * @method isLogicOperator
   *
   * @desc Checks if a function has a logical operator in the expression.
   *
   * @param method
   */
  public isLogicOperator(method: IOperator.IMethods): boolean {
    return ['$in', '$notIn'].includes(method)
  }

  /**
   * @method isLogicOperator
   *
   * @desc Checks if a function has a logical operator in the expression.
   *
   * @param method
   * @param dataType
   */
  public isValidMethod(
    method: IOperator.IMethods,
    dataType: IDataType.IOptions,
  ): boolean {
    return OPERATORS[method].datatype.includes(dataType)
  }

  /**
   * @method typeCheck
   *
   * @desc Return data type.
   *
   * @param value
   */
  public typeCheck<T>(value: T): IDataType.IOptions {
    const [[dataType]] = Object.entries(DATA_TYPE_SCHEMAS)
      .map(([key, type]) => [key, typeCheck(type, value)])
      .filter(([type, result]) => result && type)

    return dataType as IDataType.IOptions
  }

  /**
   * @method typeEquals
   *
   * @desc Check that the informed types have the same types.
   *
   * @param types
   */
  public typeEquals<A, B>($a: A, $b: B): boolean {
    return this.typeCheck($a) === this.typeCheck($b)
  }

  /**
   * @method toString
   *
   * @desc Parse Object to string
   *
   * @param type
   * @param value
   */
  public toString<T>(type: IDataType.IOptions, value: T): string {
    return type === 'json' ? JSON.stringify(value) : String(value)
  }

  /**
   * @method validade
   *
   * @desc Validation of operators based on data types
   */
  public validade(): this {
    const { values, method, data } = this.context

    const typeEquals = this.typeEquals(values.$a, values.$b)

    if (!this.isLogicOperator(method) && !typeEquals) {
      throw new Error('The informed data has different types.')
    }

    if (!this.isValidMethod(method, data.type)) {
      throw new Error(
        `Method (${method}) not active for ${data.type} data type`,
      )
    }

    return this
  }

  /**
   * @method subscribe
   *
   * @desc Register a new operator.
   *
   * @param method
   * @param values
   */
  public subscribe(method: IOperator.IMethods, values: IDataType.IValue): this {
    this.context = {
      method,
      values,
      data: {
        type: this.typeCheck(values.$a),
        equals: this.typeEquals(values.$a, values.$b),
      },
    }

    return this
  }

  /**
   * @method builder
   *
   * @desc Constructs an expression to be tested.
   *
   * @param method
   * @param dataType
   * @param values
   */
  public builder(
    method: IOperator.IMethods,
    dataType: IDataType.IOptions,
    values: IDataType.IValue,
  ): boolean {
    try {
      let localValues = values

      if (this.isArrayOrJSON(dataType) && this.isLogicOperator(method)) {
        localValues = {
          $a: this.toString(dataType, values.$a),
          $b: this.toString(dataType, values.$b),
        }
      }

      return evalAsync(parse(OPERATORS[method].expression), localValues)
    } catch (error) {
      throw new Exception(Operator.name, error.message)
    }
  }

  /**
   * @method run
   *
   * @desc Build validation expressions for implementation.
   */
  public run(): boolean {
    try {
      const { data, method, values } = this.context

      return this.builder(method, data.type, values)
    } catch (error) {
      throw new Exception(Operator.name, error.message)
    }
  }
}
