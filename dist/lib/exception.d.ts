import { ExceptionMetadata } from '../src/interfaces';
export declare class GruleError extends Error {
    constructor(message: string, metadata?: ExceptionMetadata);
}
