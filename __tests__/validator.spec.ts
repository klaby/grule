import { Validator } from '../lib/validator'

describe('Validator', () => {
  const validator = new Validator()

  describe('should return error if operator no allowed', () => {
    it('must return error for unregistered operator', () => {
      expect(() =>
        validator.validate('$foo' as any, { arg0: true, arg1: false }),
      ).toThrow(
        'Allowed operators "less,lessOrEqual,greater,greaterOrEqual,equal,diff,in,notIn".',
      )
    })
  })

  describe('less', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('less', { arg0: 1, arg1: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('less', { arg0: true, arg1: false }),
      ).toThrow('Operator "less" expects data type: (number | bigint).')
    })
  })

  describe('lessOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('lessOrEqual', { arg0: 1, arg1: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('lessOrEqual', { arg0: true, arg1: false }),
      ).toThrow('Operator "lessOrEqual" expects data type: (number | bigint).')
    })
  })

  describe('greater', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('greater', { arg0: 1, arg1: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('greater', { arg0: true, arg1: false }),
      ).toThrow('Operator "greater" expects data type: (number | bigint).')
    })
  })

  describe('greaterOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('greaterOrEqual', { arg0: 1, arg1: 2 })).toBe(
        true,
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('greaterOrEqual', { arg0: true, arg1: false }),
      ).toThrow(
        'Operator "greaterOrEqual" expects data type: (number | bigint).',
      )
    })
  })

  describe('equal', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('equal', { arg0: 1, arg1: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validator.validate('equal', { arg0: true, arg1: false })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validator.validate('equal', { arg0: 'foo', arg1: 'bar' })).toBe(
        true,
      )
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validator.validate('equal', { arg0: [true], arg1: [1, 2] }),
      ).toThrow(
        'Operator "equal" expects data type: (bigint | boolean | number | string | date).',
      )
    })

    it('must return error to a={a:1} and b={a:1}', () => {
      expect(() =>
        validator.validate('equal', { arg0: { a: 1 }, arg1: { a: 1 } }),
      ).toThrow(
        'Operator "equal" expects data type: (bigint | boolean | number | string | date).',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validator.validate('equal', { arg0: { a: 1 }, arg1: [true] }),
      ).toThrow(
        'Operator "equal" expects data type: (bigint | boolean | number | string | date).',
      )
    })
  })

  describe('diff', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('diff', { arg0: 1, arg1: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validator.validate('diff', { arg0: true, arg1: false })).toBe(true)
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validator.validate('diff', { arg0: 'foo', arg1: 'bar' })).toBe(
        true,
      )
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validator.validate('diff', { arg0: [true], arg1: [1, 2] }),
      ).toThrow(
        'Operator "diff" expects data type: (bigint | boolean | number | string | date).',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validator.validate('diff', { arg0: { a: 1 }, arg1: [true] }),
      ).toThrow(
        'Operator "diff" expects data type: (bigint | boolean | number | string | date).',
      )
    })
  })

  describe('in', () => {
    it('must return true to a=true and b=[true, 1]', () => {
      expect(validator.validate('in', { arg0: true, arg1: [true, 1] })).toBe(
        true,
      )
    })

    it('must return true to a=[true, 1] and b=true', () => {
      expect(validator.validate('in', { arg0: [true, 1], arg1: true })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="oo"', () => {
      expect(validator.validate('in', { arg0: 'foo', arg1: 'foo' })).toBe(true)
    })

    it('must return error to a={a:1} and b=[1, 2]', () => {
      expect(() =>
        validator.validate('in', { arg0: { a: 1 }, arg1: [1, 2] }),
      ).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=[1,2] and b={a:1}', () => {
      expect(() =>
        validator.validate('in', { arg0: [1, 2], arg1: { a: 1 } }),
      ).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a={a:1} and b="a"', () => {
      expect(() =>
        validator.validate('in', { arg0: { a: 1 }, arg1: 'a' }),
      ).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('in', { arg0: true, arg1: false }),
      ).toThrow(
        'Operator "in" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })
    it('must return error to a=1 and b=50', () => {
      expect(() => validator.validate('in', { arg0: 1, arg1: 50 })).toThrow(
        'Operator "in" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })

    it('must return error to a=[true] and b=[false]', () => {
      expect(() =>
        validator.validate('in', { arg0: [false], arg1: [false] }),
      ).toThrow(
        'Operator "in" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })
  })

  describe('notIn', () => {
    it('must return true to a=true and b=[true, 1]', () => {
      expect(validator.validate('notIn', { arg0: true, arg1: [true, 1] })).toBe(
        true,
      )
    })

    it('must return true to a=[true, 1] and b=true', () => {
      expect(validator.validate('notIn', { arg0: [true, 1], arg1: true })).toBe(
        true,
      )
    })

    it('must return true to a="foo" and b="oo"', () => {
      expect(validator.validate('notIn', { arg0: 'foo', arg1: 'foo' })).toBe(
        true,
      )
    })

    it('must return error to a={a:1} and b=[1, 2]', () => {
      expect(() =>
        validator.validate('notIn', { arg0: { a: 1 }, arg1: [1, 2] }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=[1,2] and b={a:1}', () => {
      expect(() =>
        validator.validate('notIn', { arg0: [1, 2], arg1: { a: 1 } }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a={a:1} and b="a"', () => {
      expect(() =>
        validator.validate('notIn', { arg0: { a: 1 }, arg1: 'a' }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('notIn', { arg0: true, arg1: false }),
      ).toThrow(
        'Operator "notIn" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })
    it('must return error to a=1 and b=50', () => {
      expect(() => validator.validate('notIn', { arg0: 1, arg1: 50 })).toThrow(
        'Operator "notIn" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })

    it('must return error to a=[true] and b=[false]', () => {
      expect(() =>
        validator.validate('notIn', { arg0: [false], arg1: [false] }),
      ).toThrow(
        'Operator "notIn" accepts: arg0 type (array | string) and arg1 type (bigint | boolean | number | string | date)".',
      )
    })
  })
})
