import { GruleError } from '../lib/exception'

describe('Exception', () => {
  it('should return an Foo Exeption error', () => {
    expect(Promise.reject(new GruleError('Foo error'))).rejects.toBeInstanceOf(
      Error,
    )
  })
})
