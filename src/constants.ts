import { IDataType, IOperator } from './interfaces'

export const OPERATORS: IOperator.IOptions[] = [
  '$less',
  '$lessOrEqual',
  '$greater',
  '$greaterOrEqual',
  '$equal',
  '$diff',
  '$in',
  '$notIn',
]

export const OPERATORS_DATATYPES: IDataType.IOperator = {
  '$less:$lessOrEqual:$greater:$greaterOrEqual': ['number', 'bigint'],
  '$equal:$diff': ['bigint', 'boolean', 'number', 'string'],
  '$in:$notIn': ['string', 'object'],
}
