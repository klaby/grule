import {
  $less,
  $lessOrEqual,
  $greater,
  $greaterOrEqual,
  $equal,
  $diff,
  $in,
  $notIn,
} from '../src/operators'

describe('Operators', () => {
  describe('$less', () => {
    it('should return true for 1 < 5', () => {
      expect($less(1, 5)).toEqual({
        method: '$less',
        result: true,
        values: { a: 1, b: 5 },
      })
    })

    it('should return false for 5 < 1', () => {
      expect($less(5, 1)).toEqual({
        method: '$less',
        result: false,
        values: { a: 5, b: 1 },
      })
    })
  })

  describe('$lessOrEqual', () => {
    it('should return true for 1 <= 1', () => {
      expect($lessOrEqual(1, 1)).toEqual({
        method: '$lessOrEqual',
        result: true,
        values: { a: 1, b: 1 },
      })
    })

    it('should return false for 1 <= 2', () => {
      expect($lessOrEqual(1, 2)).toEqual({
        method: '$lessOrEqual',
        result: true,
        values: { a: 1, b: 2 },
      })
    })
  })

  describe('$greater', () => {
    it('should return true for 5 > 1', () => {
      expect($greater(5, 1)).toEqual({
        method: '$greater',
        result: true,
        values: { a: 5, b: 1 },
      })
    })

    it('should return true for 1 > 5', () => {
      expect($greater(1, 5)).toEqual({
        method: '$greater',
        result: false,
        values: { a: 1, b: 5 },
      })
    })
  })

  describe('$greaterOrEqual', () => {
    it('should return true for 5 >= 1', () => {
      expect($greaterOrEqual(5, 1)).toEqual({
        method: '$greaterOrEqual',
        result: true,
        values: { a: 5, b: 1 },
      })
    })

    it('should return true for 5 >= 5', () => {
      expect($greaterOrEqual(5, 5)).toEqual({
        method: '$greaterOrEqual',
        result: true,
        values: { a: 5, b: 5 },
      })
    })
  })

  describe('$equal', () => {
    it('should return true for 1 === 1', () => {
      expect($equal(1, 1)).toEqual({
        method: '$equal',
        result: true,
        values: { a: 1, b: 1 },
      })
    })

    it('should return true for "foo" === "foo"', () => {
      expect($equal('foo', 'foo')).toEqual({
        method: '$equal',
        result: true,
        values: { a: 'foo', b: 'foo' },
      })
    })

    it('should return true for true === true', () => {
      expect($equal(true, true)).toEqual({
        method: '$equal',
        result: true,
        values: { a: true, b: true },
      })
    })

    it('should return false for true === 1', () => {
      expect($equal(true, 1 as any)).toEqual({
        method: '$equal',
        result: false,
        values: { a: true, b: 1 },
      })
    })

    it('should return false for "true" === "1"', () => {
      expect($equal('true', '1')).toEqual({
        method: '$equal',
        result: false,
        values: { a: 'true', b: '1' },
      })
    })
  })

  describe('$diff', () => {
    it('should return true for 1 !== 2', () => {
      expect($diff(1, 2)).toEqual({
        method: '$diff',
        result: true,
        values: { a: 1, b: 2 },
      })
    })

    it('should return true for "foo" !== "bar"', () => {
      expect($diff('foo', 'bar')).toEqual({
        method: '$diff',
        result: true,
        values: { a: 'foo', b: 'bar' },
      })
    })

    it('should return true for true !== false', () => {
      expect($diff(true, false)).toEqual({
        method: '$diff',
        result: true,
        values: { a: true, b: false },
      })
    })

    it('should return false for true !== true', () => {
      expect($diff(true, true)).toEqual({
        method: '$diff',
        result: false,
        values: { a: true, b: true },
      })
    })

    it('should return false for "bar" !== "bar"', () => {
      expect($diff('bar', 'bar')).toEqual({
        method: '$diff',
        result: false,
        values: { a: 'bar', b: 'bar' },
      })
    })
  })

  describe('$in', () => {
    it('should return true for "bar".includes("ar")', () => {
      expect($in('bar', 'ar')).toEqual({
        method: '$in',
        result: true,
        values: { a: 'bar', b: 'ar' },
      })
    })

    it('should return true for [false, true].includes(true)', () => {
      expect($in([false, true], true)).toEqual({
        method: '$in',
        result: true,
        values: { a: [false, true], b: true },
      })
    })
  })

  describe('$notIn', () => {
    it('should return true for !"bar".includes("foo")', () => {
      expect($notIn('bar', 'foo')).toEqual({
        method: '$notIn',
        result: true,
        values: { a: 'bar', b: 'foo' },
      })
    })

    it('should return false for !"bar".includes("ar")', () => {
      expect($notIn('bar', 'ar')).toEqual({
        method: '$notIn',
        result: false,
        values: { a: 'bar', b: 'ar' },
      })
    })

    it('should return false for ![false, true].includes(true)', () => {
      expect($notIn([false, true], true)).toEqual({
        method: '$notIn',
        result: false,
        values: { a: [false, true], b: true },
      })
    })
  })
})
