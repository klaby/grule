import { Validator } from '../lib/validator'

describe('Validator', () => {
  const validator = new Validator()

  describe('should return error if operator no allowed', () => {
    it('must return error for unregistered operator', () => {
      expect(() =>
        validator.validate('$foo' as any, { a: true, b: false }),
      ).toThrow(
        'Allowed operators "less,lessOrEqual,greater,greaterOrEqual,equal,diff,in,notIn".',
      )
    })
  })

  describe('less', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('less', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() => validator.validate('less', { a: true, b: false })).toThrow(
        'Operator "less" expects data type "number,bigint".',
      )
    })
  })

  describe('lessOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('lessOrEqual', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('lessOrEqual', { a: true, b: false }),
      ).toThrow('Operator "lessOrEqual" expects data type "number,bigint".')
    })
  })

  describe('greater', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('greater', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('greater', { a: true, b: false }),
      ).toThrow('Operator "greater" expects data type "number,bigint".')
    })
  })

  describe('greaterOrEqual', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('greaterOrEqual', { a: 1, b: 2 })).toBe(true)
    })

    it('must return error to a=true and b=false', () => {
      expect(() =>
        validator.validate('greaterOrEqual', { a: true, b: false }),
      ).toThrow('Operator "greaterOrEqual" expects data type "number,bigint".')
    })
  })

  describe('equal', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('equal', { a: 1, b: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validator.validate('equal', { a: true, b: false })).toBe(true)
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validator.validate('equal', { a: 'foo', b: 'bar' })).toBe(true)
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validator.validate('equal', { a: [true], b: [1, 2] }),
      ).toThrow(
        'Operator "equal" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b={a:1}', () => {
      expect(() =>
        validator.validate('equal', { a: { a: 1 }, b: { a: 1 } }),
      ).toThrow(
        'Operator "equal" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validator.validate('equal', { a: { a: 1 }, b: [true] }),
      ).toThrow(
        'Operator "equal" expects data type "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('diff', () => {
    it('must return true to a=1 and b=2', () => {
      expect(validator.validate('diff', { a: 1, b: 2 })).toBe(true)
    })

    it('must return true to a=true and b=false', () => {
      expect(validator.validate('diff', { a: true, b: false })).toBe(true)
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(validator.validate('diff', { a: 'foo', b: 'bar' })).toBe(true)
    })

    it('must return error to a=[true] and b=[1,2]', () => {
      expect(() =>
        validator.validate('diff', { a: [true], b: [1, 2] }),
      ).toThrow(
        'Operator "diff" expects data type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a={a:1} and b=[true]', () => {
      expect(() =>
        validator.validate('diff', { a: { a: 1 }, b: [true] }),
      ).toThrow(
        'Operator "diff" expects data type "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('in', () => {
    it('must return true to a=true and b=[true, 1]', () => {
      expect(validator.validate('in', { a: true, b: [true, 1] })).toBe(true)
    })

    it('must return true to a=[true, 1] and b=true', () => {
      expect(validator.validate('in', { a: [true, 1], b: true })).toBe(true)
    })

    it('must return true to a="foo" and b="oo"', () => {
      expect(validator.validate('in', { a: 'foo', b: 'foo' })).toBe(true)
    })

    it('must return error to a={a:1} and b=[1, 2]', () => {
      expect(() =>
        validator.validate('in', { a: { a: 1 }, b: [1, 2] }),
      ).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=[1,2] and b={a:1}', () => {
      expect(() =>
        validator.validate('in', { a: [1, 2], b: { a: 1 } }),
      ).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a={a:1} and b="a"', () => {
      expect(() => validator.validate('in', { a: { a: 1 }, b: 'a' })).toThrow(
        'Operator "in" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() => validator.validate('in', { a: true, b: false })).toThrow(
        'Operator "in" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })
    it('must return error to a=1 and b=50', () => {
      expect(() => validator.validate('in', { a: 1, b: 50 })).toThrow(
        'Operator "in" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a=[true] and b=[false]', () => {
      expect(() =>
        validator.validate('in', { a: [false], b: [false] }),
      ).toThrow(
        'Operator "in" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })
  })

  describe('notIn', () => {
    it('must return true to a=true and b=[true, 1]', () => {
      expect(validator.validate('notIn', { a: true, b: [true, 1] })).toBe(true)
    })

    it('must return true to a=[true, 1] and b=true', () => {
      expect(validator.validate('notIn', { a: [true, 1], b: true })).toBe(true)
    })

    it('must return true to a="foo" and b="oo"', () => {
      expect(validator.validate('notIn', { a: 'foo', b: 'foo' })).toBe(true)
    })

    it('must return error to a={a:1} and b=[1, 2]', () => {
      expect(() =>
        validator.validate('notIn', { a: { a: 1 }, b: [1, 2] }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=[1,2] and b={a:1}', () => {
      expect(() =>
        validator.validate('notIn', { a: [1, 2], b: { a: 1 } }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a={a:1} and b="a"', () => {
      expect(() =>
        validator.validate('notIn', { a: { a: 1 }, b: 'a' }),
      ).toThrow(
        'Operator "notIn" expects data type "bigint,boolean,number,string,array".',
      )
    })

    it('must return error to a=true and b=false', () => {
      expect(() => validator.validate('notIn', { a: true, b: false })).toThrow(
        'Operator "notIn" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })
    it('must return error to a=1 and b=50', () => {
      expect(() => validator.validate('notIn', { a: 1, b: 50 })).toThrow(
        'Operator "notIn" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })

    it('must return error to a=[true] and b=[false]', () => {
      expect(() =>
        validator.validate('notIn', { a: [false], b: [false] }),
      ).toThrow(
        'Operator "notIn" sparks one argument of type "bigint,boolean,number,string,array" and another with type "bigint,boolean,number,string,date".',
      )
    })
  })
})
