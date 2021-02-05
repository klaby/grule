import { OPERATORS, OPERATORS_DATATYPES } from './constants'

import { IOperator } from './interfaces'

import { getDataTypes, typeCheck } from './helpers'

/**
 * @function isValidOperator
 * @desc Validates data entered for each operator call.
 * @param operator
 */
export const isValidOperator = (operator: IOperator.IOptions): boolean =>
  OPERATORS.includes(operator)

/**
 * @function validateValuesPerOperator
 * @desc Validates the data reported for each operator.
 * @param operator
 * @param values
 */
export const validateValuesPerOperator = (
  operator: IOperator.IOptions,
  values: Record<'a' | 'b', IOperator.Idle>,
): boolean => {
  if (!isValidOperator(operator)) {
    throw new Error(`Allowed operators "${OPERATORS.toString()}".`)
  }

  const schema = getDataTypes(operator)
  const result = typeCheck(schema.types, values)

  switch (schema.key) {
    case '$less:$lessOrEqual:$greater:$greaterOrEqual':
      if (!result.checked) {
        throw new Error(
          `Operator "${operator}" expects data type "${schema.types}".`,
        )
      }

      return true
    case '$equal:$diff':
      if (Object.values(result.types).includes('object')) {
        throw new Error(
          `Operator "${operator}" expects data type "${schema.types}".`,
        )
      }

      return true
    case '$in:$notIn':
      const typesAccepted = OPERATORS_DATATYPES['$equal:$diff']
      const { a, b } = result.types

      if (!schema.types.includes(a)) {
        throw new Error(
          `Operator "${operator}" expects data type "${schema.types}".`,
        )
      }

      if (!typesAccepted.includes(b)) {
        throw new Error(
          `Operator "${operator}" expects a second argument of "${typesAccepted}".`,
        )
      }

      return true
  }
}
