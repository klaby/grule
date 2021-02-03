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
   * @method toString
   *
   * @desc Parse Object to string
   *
   * @param type
   * @param value
   */
  public toString<T>(type: IDataType.IOptions, value: T): string {
    switch (type) {
      case 'json':
        return JSON.stringify(value)
      case 'array':
      default:
        return String(value)
    }
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
      if (!OPERATORS[method].datatype.includes(dataType)) {
        throw new Error(
          `Method (${method}) not active for ${dataType} data type`,
        )
      }

      return evalAsync(parse(OPERATORS[method].expression), values)
    } catch (error) {
      throw new Exception(Operator.name, error.message)
    }
  }
}
