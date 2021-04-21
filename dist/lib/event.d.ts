export declare class Event {
    constructor();
    /**
     * @method when
     *
     * @desc When a condition is "true".
     *
     * @param result
     */
    when(result: boolean): Promise<boolean>;
}
