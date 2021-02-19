import { IDataTypes } from 'chork'

export interface IEvent {
  when(result: boolean): Promise<boolean>
}

export type Idle = unknown | any
export type ILess = number
export type IGreater = number
export type IEqual = number | boolean | string
export type In = string | Idle[]

export type IOperatorsSchemaKeys =
  | 'less:lessOrEqual:greater:greaterOrEqual'
  | 'equal:diff'
  | 'in:notIn'

export type IOperatorsSchema = {
  key: IOperatorsSchemaKeys
  types: IDataTypes[]
}

export type IOperators = {
  eval(operator: Exclude<keyof IOperators, 'eval'>, value: Idle): boolean
  less(value: ILess): boolean
  lessOrEqual(value: ILess): boolean
  greater(value: IGreater): boolean
  greaterOrEqual(value: IGreater): boolean
  equal(value: IEqual): boolean
  diff(value: IEqual): boolean
  in(value: In): boolean
  notIn(value: In): boolean
}

export type IOperatorsList = keyof IOperators

export type IContext<T> = Record<keyof T, IOperators & Record<'$value', Idle>>

export type ExceptionMetadata = Record<string, Idle>

export type IRuleAttributes = Record<'context' | 'result', Idle[]>

export type IArgs = Record<'arg0' | 'arg1', Idle>

export type IRules<T> = (
  attributes: IContext<T>,
  events: IEvent,
) => Record<keyof T, Promise<boolean> | boolean>

export type IRulesContext<T> = Record<keyof T, boolean>

export type IDataTypesSchema = {
  checked: boolean
  equals: boolean
  types: IArgs
}
