export namespace IException {
  export type IProps = {
    code: string
    message: string
  }
}

export class Exception extends Error {
  constructor({ code, message }: IException.IProps) {
    super(message)
    this.name = code
  }
}
