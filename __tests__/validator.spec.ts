import { validateValuesPerOperator } from '../src/validator'

describe('Validator', () => {
  describe('should return error if operator no allowed', () => {
    it('must return error for unregistered operator', () => {
      expect(() =>
        validateValuesPerOperator('$foo' as any, { a: true, b: false }),
      ).toThrow(
        'Allowed operators "$less,$lessOrEqual,$greater,$greaterOrEqual,$equal,$diff,$in,$notIn".',
      )
    })
  })

  describe('$less', () => {
    it('must return true to a=1 and b=2', () => {
      try {
        validateValuesPerOperator('$less', { a: 1, b: 2 })
      } catch (error) {
        console.log(error)
      }

      expect(validateValuesPerOperator('$less', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$less', { a: true, b: false }),
      ).toThrow('Operator "$less" expects data type "number,bigint".')
    })
  })

  describe('$lessOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validateValuesPerOperator('$lessOrEqual', { a: 1, b: 2 })).toBe(
        true,
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$lessOrEqual', { a: true, b: false }),
      ).toThrow('Operator "$lessOrEqual" expects data type "number,bigint".')
    })
  })

  describe('$greater', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validateValuesPerOperator('$greater', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$greater', { a: true, b: false }),
      ).toThrow('Operator "$greater" expects data type "number,bigint".')
    })
  })

  describe('$greaterOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validateValuesPerOperator('$greaterOrEqual', { a: 1, b: 2 })).toBe(
        true,
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$greaterOrEqual', { a: true, b: false }),
      ).toThrow('Operator "$greaterOrEqual" expects data type "number,bigint".')
    })
  })

  describe('$equal', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validateValuesPerOperator('$equal', { a: 1, b: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validateValuesPerOperator('$equal', { a: true, b: false })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validateValuesPerOperator('$equal', { a: 'foo', b: 'bar' })).toBe(
        true,
      )
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validateValuesPerOperator('$equal', { a: [true], b: [1, 2] }),
      ).toThrow(
        'Operator "$equal" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b={a:1}', () => {
      expect(() =>
        validateValuesPerOperator('$equal', { a: { a: 1 }, b: { a: 1 } }),
      ).toThrow(
        'Operator "$equal" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validateValuesPerOperator('$equal', { a: { a: 1 }, b: [true] }),
      ).toThrow(
        'Operator "$equal" expects data type "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('$diff', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validateValuesPerOperator('$diff', { a: 1, b: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validateValuesPerOperator('$diff', { a: true, b: false })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validateValuesPerOperator('$diff', { a: 'foo', b: 'bar' })).toBe(
        true,
      )
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validateValuesPerOperator('$diff', { a: [true], b: [1, 2] }),
      ).toThrow(
        'Operator "$diff" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validateValuesPerOperator('$diff', { a: { a: 1 }, b: [true] }),
      ).toThrow(
        'Operator "$diff" expects data type "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('$in', () => {
    it('must return true to a=[true, 1] and b=true', () => {
      expect(validateValuesPerOperator('$in', { a: [true, 1], b: true })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="oo"', () => {
      expect(validateValuesPerOperator('$in', { a: 'foo', b: 'foo' })).toBe(
        true,
      )
    })

    it('must return error to a={a:1} and b="a"', () => {
      expect(() =>
        validateValuesPerOperator('$in', { a: { a: 1 }, b: 'a' }),
      ).toThrow('Operator "$in" expects data type "string,array"')
    })

    it('must return error to a=1 and b=50', () => {
      expect(() => validateValuesPerOperator('$in', { a: 1, b: 50 })).toThrow(
        'Operator "$in" expects data type "string,array".',
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$in', { a: true, b: false }),
      ).toThrow('Operator "$in" expects data type "string,array".')
    })

    it('must return error to a=[true] and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$in', { a: [false], b: [false] }),
      ).toThrow(
        'Operator "$in" expects a second argument of "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('$notIn', () => {
    it('must return true to a=[true, 1] and b=true', () => {
      expect(
        validateValuesPerOperator('$notIn', { a: [true, 1], b: true }),
      ).toBe(true)
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validateValuesPerOperator('$notIn', { a: 'foo', b: 'bar' })).toBe(
        true,
      )
    })

    it('must return error to a={a:1} and b={a:1}', () => {
      expect(() =>
        validateValuesPerOperator('$notIn', { a: { a: 1 }, b: { a: 1 } }),
      ).toThrow('Operator "$notIn" expects data type "string,array".')
    })

    it('must return error to a=1 and b=50', () => {
      expect(() =>
        validateValuesPerOperator('$notIn', { a: 1, b: 50 }),
      ).toThrow('Operator "$notIn" expects data type "string,array".')
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validateValuesPerOperator('$notIn', { a: true, b: false }),
      ).toThrow('Operator "$notIn" expects data type "string,array".')
    })
  })
})
