import { IDataTypes } from 'chork'
import { IArgs, IOperatorsList } from '../src/interfaces'
import { OPERATORS, OPERATORS_DATATYPES } from '../src/constants'
import { GruleError } from './exception'
import { getDataTypes, typeCheck } from '../src/helpers'

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
      throw new GruleError(`Allowed operators "${OPERATORS}".`)
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
    this.operator(operator)

    const blacklist = ['array', 'object']
    const schema = getDataTypes(operator)
    const { checked, equals, types } = typeCheck(schema.types, args)

    switch (schema.key) {
      case 'less:lessOrEqual:greater:greaterOrEqual':
        if (!checked) {
          throw new GruleError(
            `Operator "${operator}" expects data type: ${this.parseTypes(
              schema.types,
            )}.`,
          )
        }

        return true
      case 'equal:diff':
        if (Object.values(types).some(v => blacklist.includes(v))) {
          throw new GruleError(
            `Operator "${operator}" expects data type: ${this.parseTypes(
              schema.types,
            )}.`,
          )
        }

        return true
      case 'in:notIn':
        if (checked) {
          if (equals && types.arg0 !== 'string' && types.arg1 !== 'string') {
            throw new GruleError(
              `Operator "${operator}" accepts: arg0 type ${this.parseTypes([
                'array',
                'string',
              ])} and arg1 type ${this.parseTypes(
                OPERATORS_DATATYPES['equal:diff'],
              )}".`,
            )
          }
        } else {
          throw new GruleError(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true

      default:
        return false
    }
  }
}
