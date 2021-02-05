import { $when, $throw } from '../src/events'

describe('Events', () => {
  describe('$when', () => {
    it('should return a resolved event schema', () => {
      expect(
        $when({
          method: '$equal',
          result: 1 === 1,
          values: { a: 1, b: 1 },
        }),
      ).toEqual({
        condition: {
          method: '$equal',
          result: true,
          values: { a: 1, b: 1 },
        },
        event: undefined,
      })
    })

    it('should return a resolved event schema with an event', () => {
      const fakeFunc = () => {}

      expect(
        $when(
          {
            method: '$greater',
            result: 1 > 1,
            values: { a: 1, b: 1 },
          },
          fakeFunc,
        ),
      ).toEqual({
        condition: {
          method: '$greater',
          result: false,
          values: { a: 1, b: 1 },
        },
        event: fakeFunc,
      })
    })
  })

  describe('$throw', () => {
    it('should return a throw function', () => {
      expect($throw('Error')).toThrow()
    })
  })
})
