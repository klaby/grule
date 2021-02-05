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
  export type Idle = unknown | any

  export type IBuilder = {
    result: boolean
    method: IOptions
    values: { a: any; b: any }
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
  export type IOptions =
    | 'string'
    | 'number'
    | 'bigint'
    | 'boolean'
    | 'symbol'
    | 'undefined'
    | 'object'
    | 'function'

  export type ISchemaCheck = {
    checked: boolean
    equals: boolean
    types: Record<'a' | 'b', IOptions>
  }

  export type ISchemaOptions = {
    key: IOperator.IDataSchemaKey
    types: IOptions[]
  }

  export type IOperator = Record<IOperator.IDataSchemaKey, IOptions[]>
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

  export type IRules<T = any> = (metadata: T) => IRulesSchema<T>

  export type IFacts<T = any> = T

  export type IContextStatus = 'success' | 'failed'

  export type IContext<R> = {
    [k in keyof R]: {
      status: IContextStatus
      method: IOperator.IOptions
      values: {
        expected: any
        sended: any
      }
      event?: Function
    }
  }
}
