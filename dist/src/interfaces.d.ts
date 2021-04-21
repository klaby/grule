import { IDataTypes } from 'chork';
export interface IEvent {
    when(result: boolean): Promise<boolean>;
}
export declare type Idle = unknown | any;
export declare type ILess = number;
export declare type IGreater = number;
export declare type IEqual = number | boolean | string;
export declare type In = string | Idle[];
export declare type IOperatorsSchemaKeys = 'less:lessOrEqual:greater:greaterOrEqual' | 'equal:diff' | 'in:notIn';
export declare type IOperatorsSchema = {
    key: IOperatorsSchemaKeys;
    types: IDataTypes[];
};
export declare type IOperators = {
    eval(operator: Exclude<keyof IOperators, 'eval'>, value: Idle): boolean;
    less(value: ILess): boolean;
    lessOrEqual(value: ILess): boolean;
    greater(value: IGreater): boolean;
    greaterOrEqual(value: IGreater): boolean;
    equal(value: IEqual): boolean;
    diff(value: IEqual): boolean;
    in(value: In): boolean;
    notIn(value: In): boolean;
};
export declare type IOperatorsList = keyof IOperators;
export declare type IContext<T> = Record<keyof T, IOperators & Record<'$value', Idle>>;
export declare type ExceptionMetadata = Record<string, Idle>;
export declare type IRuleAttributes = Record<'context' | 'result', Idle[]>;
export declare type IArgs = Record<'arg0' | 'arg1', Idle>;
export declare type IRules<T> = (attributes: IContext<T>, events: IEvent) => Record<keyof T, Promise<boolean> | boolean>;
export declare type IRulesContext<T> = Record<keyof T, boolean>;
export declare type IDataTypesSchema = {
    checked: boolean;
    equals: boolean;
    types: IArgs;
};
