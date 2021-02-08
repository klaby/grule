import { Idle, IOperatorsList } from '../src/interfaces'
import { OPERATORS, OPERATORS_DATATYPES } from '../src/constants'
import { ValidatorError } from './exception'
import { getDataTypes, typeCheck } from '../src/helpers'

export class Validator {
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
   * @param values
   */
  public validate(
    operator: IOperatorsList,
    values: Record<'a' | 'b', Idle>,
  ): boolean {
    const schema = getDataTypes(operator)
    const result = typeCheck(schema.types, values)

    this.operator(operator)

    switch (schema.key) {
      case 'less:lessOrEqual:greater:greaterOrEqual':
        if (!result.checked) {
          throw new ValidatorError(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
      case 'equal:diff':
        const blacklist = ['array', 'object']

        if (Object.values(result.types).some(v => blacklist.includes(v))) {
          throw new ValidatorError(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
      case 'in:notIn':
        const typesAccepted = OPERATORS_DATATYPES['equal:diff']
        const { a, b } = result.types

        if (result.checked) {
          if (result.equals && a !== 'string' && b !== 'string') {
            throw new ValidatorError(
              `Operator "${operator}" sparks one argument of type "${schema.types}" and another with type "${typesAccepted}".`,
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
