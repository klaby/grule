import { IRules } from '../src/interfaces';
export declare class Grule<T> {
    private facts;
    private context;
    constructor(facts: T);
    /**
     * @method subscribe
     *
     * @desc Enter the rules for the informed facts.
     *
     * @param rules
     */
    private subscribe;
    /**
     * @method run
     *
     * @desc Run the test stack for the defined rules.
     *
     * @param rules
     */
    run(rules: IRules<T>): Promise<boolean>;
}
