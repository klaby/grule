import { ExceptionMetadata } from '../src/interfaces'

class Exception extends Error {
  constructor(code: string, message: string, metadata?: ExceptionMetadata) {
    super(message)
    this.name = code
    Object.assign(this, { ...metadata })
  }
}

export class GruleError extends Exception {
  constructor(message: string, metadata?: ExceptionMetadata) {
    super('GruleError', message, metadata)
  }
}
