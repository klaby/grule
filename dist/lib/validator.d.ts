import { IArgs, IOperatorsList } from '../src/interfaces';
export declare class Validator {
    /**
     * @method parseTypes
     *
     * @desc Parse types to string.
     *
     * ** string | array **
     *
     * @param types
     */
    private parseTypes;
    /**
     * @method isValidOperator
     *
     * @desc Checks whether the operator is valid.
     *
     * @param operator
     */
    operator(operator: IOperatorsList): boolean;
    /**
     * @method
     *
     * @desc Perform data type tests against operators.
     *
     * @param operator
     * @param args
     */
    validate(operator: IOperatorsList, args: IArgs): boolean;
}
