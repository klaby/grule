import { ExceptionMetadata } from '../src/interfaces'

class Exception extends Error {
  constructor(code: string, message: string, metadata?: ExceptionMetadata) {
    super(message)
    this.name = code
    Object.assign(this, { ...metadata })
  }
}

export class EngineError extends Exception {
  constructor(message: string, metadata?: ExceptionMetadata) {
    super('EngineError', message, metadata)
  }
}

export class ValidatorError extends Exception {
  constructor(message: string, metadata?: ExceptionMetadata) {
    super('ValidatorError', message, metadata)
  }
}
