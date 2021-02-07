export class Exception extends Error {
  constructor(
    code: string,
    message: string,
    metadata: Record<string, any> = {},
  ) {
    super(message)
    this.name = code
    Object.assign(this, { ...metadata })
  }
}
