import { Exception } from '../lib/exception'

describe('Exception', () => {
  it('should return an Foo Exeption error', () => {
    expect(
      Promise.reject(new Exception('Foo', 'Foo error')),
    ).rejects.toBeInstanceOf(Error)
  })
})
