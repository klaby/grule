import { Event } from '../lib/event'

describe('Events', () => {
  const { when } = new Event()

  it('should return true to 1 === 1', async () => {
    expect(when(1 === 1).then(() => true)).resolves.toBe(true)
  })

  it('should return false to "foo" === "bar"', async () => {
    const bar: any = 'bar'
    const foo = 'foo' === bar
    expect(when(foo).then(() => false)).resolves.toBe(false)
  })

  it('should return error to "foo" === "foo"', async () => {
    const bar: any = 'foo'
    const foo = 'foo' === bar

    expect(
      when(foo).then(() => {
        throw new Error('Error')
      }),
    ).rejects.toThrow('Error')
  })
})
