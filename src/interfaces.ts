import { IDataTypes } from 'chork'

export type Idle = unknown | any
export namespace IOperator {
  export type ILogic =
    | '$less'
    | '$lessOrEqual'
    | '$greater'
    | '$greaterOrEqual'
    | '$equal'
    | '$diff'

  export type IModifier = '$in' | '$notIn'
  export type IOptions = ILogic | IModifier
  export type IDataSchemaKey =
    | '$less:$lessOrEqual:$greater:$greaterOrEqual'
    | '$equal:$diff'
    | '$in:$notIn'

  export type ILess = number
  export type IGreater = number
  export type IEqual = number | boolean | string
  export type In = string | [] | Record<string, any>

  export type IBuilder = {
    result: boolean
    method: IOptions
    values: { a: Idle; b: Idle }
  }

  export type IMethodsLogic = {
    [k in ILogic]: <A>(a: A, b: A) => IBuilder
  }

  export type IMethodsModifier = {
    [k in IModifier]: <A, B>(a: A, b: B) => IBuilder
  }

  export type IMethods = IMethodsLogic & IMethodsModifier
}

export namespace IDataType {
  export type ISchemaCheck = {
    checked: boolean
    equals: boolean
    types: Record<'a' | 'b', IDataTypes>
  }

  export type ISchemaOptions = {
    key: IOperator.IDataSchemaKey
    types: IDataTypes[]
  }

  export type IOperator = Record<IOperator.IDataSchemaKey, IDataTypes[]>
}

export namespace IEvents {
  export type IOptions = '$throw' | '$done'

  export type ISchema = {
    condition: IOperator.IBuilder
    event?: Function
  }

  export type IMethods = {
    $throw: (message: string) => Function
    $when: (condition: IOperator.IBuilder, event?: Function) => ISchema
  }
}

export namespace IEngine {
  export type IRulesSchema<T> = Record<keyof T, IEvents.ISchema>

  export type IRules<T extends Idle> = (metadata: T) => IRulesSchema<T>

  export type IFacts<T extends Idle> = T

  export type IContextStatus = 'success' | 'failed'

  export type IContext<R> = {
    [k in keyof R]: {
      status: IContextStatus
      method: IOperator.IOptions
      values: {
        expected: Idle
        sended: Idle
      }
      event?: Function
    }
  }
}
