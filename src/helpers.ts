import { IOperator } from './interfaces'
import { OPERATORS_DATATYPES } from './constants'
import { IDataType } from './interfaces'

/**
 * @method typeCheck
 * @desc Check data type.
 * @param options
 * @param value
 */
export const typeCheck = <V>(
  options: IDataType.IOptions[],
  value: Record<'a' | 'b', V>,
): IDataType.ISchemaCheck => {
  const types = {
    a: typeof value.a,
    b: typeof value.b,
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
