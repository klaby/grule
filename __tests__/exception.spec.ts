import { EngineError } from '../lib/exception'

describe('Exception', () => {
  it('should return an Foo Exeption error', () => {
    expect(Promise.reject(new EngineError('Foo error'))).rejects.toBeInstanceOf(
      Error,
    )
  })
})
