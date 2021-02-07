import { Idle, IOperatorsList } from '../src/interfaces'
import { OPERATORS, OPERATORS_DATATYPES } from '../src/constants'
import { Exception } from './exception'
import { getDataTypes, typeCheck } from '../src/helpers'

export class Validator {
  /**
   * @method error
   *
   * @desc Launch error for validation.
   *
   * @param message
   */
  private error(message: string): never {
    throw new Exception(Validator.name, message)
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

    if (!OPERATORS.includes(operator)) {
      this.error(`Allowed operators "${OPERATORS}".`)
    }

    switch (schema.key) {
      case 'less:lessOrEqual:greater:greaterOrEqual':
        if (!result.checked) {
          this.error(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
      case 'equal:diff':
        const blacklist = ['array', 'object']

        if (Object.values(result.types).some(v => blacklist.includes(v))) {
          this.error(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
      case 'in:notIn':
        const typesAccepted = OPERATORS_DATATYPES['equal:diff']
        const { a, b } = result.types

        if (result.checked) {
          if (result.equals && a !== 'string' && b !== 'string') {
            this.error(
              `Operator "${operator}" sparks one argument of type "${schema.types}" and another with type "${typesAccepted}".`,
            )
          }
        } else {
          this.error(
            `Operator "${operator}" expects data type "${schema.types}".`,
          )
        }

        return true
    }
  }
}
