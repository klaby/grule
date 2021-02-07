import { checkAll, IDataTypes } from 'chork'
import {
  IDataTypesSchema,
  IOperatorsSchema,
  IOperatorsSchemaKeys,
  IOperatorsList,
} from '../src/interfaces'
import { OPERATORS_DATATYPES } from '../src/constants'

/**
 * @method typeCheck
 *
 * @desc Check data type.
 *
 * @param options
 * @param values
 */
export const typeCheck = <V>(
  options: IDataTypes[],
  values: Record<'a' | 'b', V>,
): IDataTypesSchema => {
  const types: Record<'a' | 'b', IDataTypes> = checkAll(values)
  const checked = Object.values(types).every(type => options?.includes(type))
  const equals = types.a === types.b

  return { checked, equals, types }
}

/**
 * @function getDataTypes
 *
 * @desc Returns a schema of data accepted by an operator.
 *
 * @param operator
 */
export const getDataTypes = (operator: IOperatorsList): IOperatorsSchema => {
  const [key] = Object.keys(OPERATORS_DATATYPES).filter(schema =>
    schema.includes(operator),
  ) as IOperatorsSchemaKeys[]

  return {
    key,
    types: OPERATORS_DATATYPES[key],
  }
}
