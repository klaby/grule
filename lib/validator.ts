import { IArgs, IOperatorsList } from '../src/interfaces'
import { OPERATORS, OPERATORS_DATATYPES } from '../src/constants'
import { ValidatorError } from './exception'
import { getDataTypes, typeCheck } from '../src/helpers'
import { IDataTypes } from 'chork'

export class Validator {
  /**
   * @method parseTypes
   *
   * @desc Parse types to string.
   *
   * ** string | array **
   *
   * @param types
   */
  private parseTypes(types: IDataTypes[]): string {
    return `(${types.toString().replace(/,/g, ' | ')})`
  }

  /**
   * @method isValidOperator
   *
   * @desc Checks whether the operator is valid.
   *
   * @param operator
   */
  public operator(operator: IOperatorsList): boolean {
    if (!OPERATORS.includes(operator)) {
      throw new ValidatorError(`Allowed operators "${OPERATORS}".`)
    }

    return true
  }

  /**
   * @method
   *
   * @desc Perform data type tests against operators.
   *
   * @param operator
   * @param args
   */
  public validate(operator: IOperatorsList, args: IArgs): boolean {
    const schema = getDataTypes(operator)
    const result = typeCheck(schema.types, args)

    this.operator(operator)

    switch (schema.key) {
      case 'less:lessOrEqual:greater:greaterOrEqual':
        if (!result.checked) {
          throw new ValidatorError(
            `Operator "${operator}" expects data type: ${this.parseTypes(
              schema.types,
            )}.`,
          )
        }

        return true
      case 'equal:diff':
        const blacklist = ['array', 'object']

        if (Object.values(result.types).some(v => blacklist.includes(v))) {
          throw new ValidatorError(
            `Operator "${operator}" expects data type: ${this.parseTypes(
              schema.types,
            )}.`,
          )
        }

        return true
      case 'in:notIn':
        const { arg0, arg1 } = result.types

        if (result.checked) {
          if (result.equals && arg0 !== 'string' && arg1 !== 'string') {
            throw new ValidatorError(
              `Operator "${operator}" accepts: arg0 type ${this.parseTypes([
                'array',
                'string',
              ])} and arg1 type ${this.parseTypes(
                OPERATORS_DATATYPES['equal:diff'],
              )}".`,
            )
          }
        } else {
          throw new ValidatorError(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
    }
  }
}
