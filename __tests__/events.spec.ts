import { Event } from '../lib/event'

describe('Events', () => {
  const { when } = new Event()

  it('should return true to 1 === 1', () => {
    expect(when(1 === 1).then(() => {})).toBe(true)
  })

  it('should return false to "foo" === "bar"', () => {
    const bar: any = 'bar'
    const foo = 'foo' === bar
    expect(when(foo).then(() => {})).toBe(false)
  })

  it('should return error to "foo" === "foo"', () => {
    const bar: any = 'foo'
    const foo = 'foo' === bar
    expect(() =>
      when(foo).then(() => {
        throw new Error('Error')
      }),
    ).toThrow('Error')
  })
})
