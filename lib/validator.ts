import { typeCheck } from 'type-check'

import { Operator, IOperator, IDataType, DATA_TYPE_SCHEMAS } from './operator'

import { Exception } from './exception'

export class Validator {
  constructor(private readonly operator: Operator) {}

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
   * @method run
   *
   * @desc Build validation expressions for implementation.
   *
   * @param method
   * @param values
   */
  public run(method: IOperator.IMethods, values: IDataType.IValue): boolean {
    try {
      const dataType = this.typeCheck(values.$a)
      const typeEquals = this.typeEquals(values.$a, values.$b)

      let localValues = values

      if (!this.operator.isLogicOperator(method) && !typeEquals) {
        throw new Error('The informed data has different types.')
      }

      if (this.operator.isArrayOrJSON(dataType)) {
        localValues = {
          $a: this.operator.toString(dataType, values.$a),
          $b: this.operator.toString(dataType, values.$b),
        }
      }

      return this.operator.builder(method, dataType, localValues)
    } catch (error) {
      throw new Exception(Validator.name, error.message)
    }
  }
}
