import { IDataTypes } from 'chork';
import { IDataTypesSchema, IOperatorsSchema, IOperatorsList, IArgs } from '../src/interfaces';
/**
 * @method typeCheck
 *
 * @desc Check data type.
 *
 * @param options
 * @param values
 */
export declare const typeCheck: <V>(options: IDataTypes[], args: IArgs) => IDataTypesSchema;
/**
 * @function getDataTypes
 *
 * @desc Returns a schema of data accepted by an operator.
 *
 * @param operator
 */
export declare const getDataTypes: (operator: IOperatorsList) => IOperatorsSchema;
