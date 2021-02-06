import { IOperator } from './interfaces'
import { OPERATORS_DATATYPES } from './constants'
import { IDataType } from './interfaces'
import { check, IDataTypes } from 'chork'

/**
 * @method typeCheck
 * @desc Check data type.
 * @param options
 * @param values
 */
export const typeCheck = <V>(
  options: IDataTypes[],
  values: Record<'a' | 'b', V>,
): IDataType.ISchemaCheck => {
  const types: Record<'a' | 'b', IDataTypes> = {
    a: check(values.a),
    b: check(values.b),
  }

  const checked = Object.values(types).every(type => options.includes(type))
  const equals = types.a === types.b

  return { checked, equals, types }
}

/**
 * @function getDataTypes
 * @desc Returns a schema of data accepted by an operator
 * @param operator
 */
export const getDataTypes = (
  operator: IOperator.IOptions,
): IDataType.ISchemaOptions => {
  const [key] = Object.keys(OPERATORS_DATATYPES).filter(o =>
    o.includes(operator),
  ) as IOperator.IDataSchemaKey[]

  return {
    key,
    types: OPERATORS_DATATYPES[key],
  }
}
