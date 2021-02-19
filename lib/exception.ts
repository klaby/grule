import { ExceptionMetadata } from '../src/interfaces'

export class GruleError extends Error {
  constructor(message: string, metadata?: ExceptionMetadata) {
    super(message)
    this.name = 'GruleError'
    Object.assign(this, { ...metadata })
  }
}
