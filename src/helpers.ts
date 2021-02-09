import { checkAll, IDataTypes } from 'chork'
import {
  IDataTypesSchema,
  IOperatorsSchema,
  IOperatorsSchemaKeys,
  IOperatorsList,
  IArgs,
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
  args: IArgs,
): IDataTypesSchema => {
  const types: IArgs = checkAll(args)
  const checked = Object.values(types).every(
    type => options && options.includes(type),
  )
  const equals = types.arg0 === types.arg1

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
