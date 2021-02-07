import { IDataTypes } from 'chork'
import { IOperatorsList, IOperatorsSchemaKeys } from './interfaces'

export const OPERATORS: IOperatorsList[] = [
  'less',
  'lessOrEqual',
  'greater',
  'greaterOrEqual',
  'equal',
  'diff',
  'in',
  'notIn',
]

export const OPERATORS_DATATYPES: Record<IOperatorsSchemaKeys, IDataTypes[]> = {
  'less:lessOrEqual:greater:greaterOrEqual': ['number', 'bigint'],
  'equal:diff': ['bigint', 'boolean', 'number', 'string', 'date'],
  'in:notIn': ['bigint', 'boolean', 'number', 'string', 'array'],
}
