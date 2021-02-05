import { Exception } from '../src/exception'

describe('Exception', () => {
  it('should return an Foo Exeption error', () => {
    expect(new Exception('Foo', 'Foo error')).toBeInstanceOf(Exception)
  })
})
