import { IDataTypes } from 'chork'
import { typeCheck } from '../src/helpers'

describe('Helpers', () => {
  describe("['number', 'bigint']", () => {
    const types: IDataTypes[] = ['bigint', 'number']

    it('should return true to a=1 and b=5', () => {
      expect(typeCheck(types, { a: 1, b: 5 })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'number', b: 'number' },
      })
    })

    it('must return false to a=1 and b="b"', () => {
      expect(typeCheck(types, { a: 1, b: 'b' as any })).toEqual({
        checked: false,
        equals: false,
        types: { a: 'number', b: 'string' },
      })
    })
  })

  describe("['bigint', 'boolean', 'number', 'string']", () => {
    const types: IDataTypes[] = ['bigint', 'boolean', 'number', 'string']

    it('should return true to a=1 and b=5', () => {
      expect(typeCheck(types, { a: 1, b: 5 })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'number', b: 'number' },
      })
    })

    it('must return true to a=true and b=false', () => {
      expect(typeCheck(types, { a: true, b: false })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'boolean', b: 'boolean' },
      })
    })

    it('must return true to a="foo" and b="bar"', () => {
      expect(typeCheck(types, { a: 'foo', b: 'bar' })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'string', b: 'string' },
      })
    })

    it('must return false to a=[] and b=[]', () => {
      expect(typeCheck(types, { a: [], b: [] })).toEqual({
        checked: false,
        equals: true,
        types: { a: 'array', b: 'array' },
      })
    })

    it('must return false to a={a:1} and b={a:1}', () => {
      expect(typeCheck(types, { a: { a: 1 }, b: { a: 1 } })).toEqual({
        checked: false,
        equals: true,
        types: { a: 'object', b: 'object' },
      })
    })
  })

  describe("['string', 'object']", () => {
    const types: IDataTypes[] = ['string', 'array']

    it('should return true to a="foo" and b="foo"', () => {
      expect(typeCheck(types, { a: 'foo', b: 'foo' })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'string', b: 'string' },
      })
    })

    it('must return true to a=[1] and b=["foo"]', () => {
      expect(typeCheck(types, { a: [1], b: ['foo'] })).toEqual({
        checked: true,
        equals: true,
        types: { a: 'array', b: 'array' },
      })
    })

    it('must return true to a={a:1} and b={a:1}', () => {
      expect(typeCheck(types, { a: { a: 1 }, b: { a: 1 } })).toEqual({
        checked: false,
        equals: true,
        types: { a: 'object', b: 'object' },
      })
    })

    it('must return false to a=1 and b=1', () => {
      expect(typeCheck(types, { a: 1, b: 1 })).toEqual({
        checked: false,
        equals: true,
        types: { a: 'number', b: 'number' },
      })
    })

    it('must return false to a=true and b=false', () => {
      expect(typeCheck(types, { a: true, b: false })).toEqual({
        checked: false,
        equals: true,
        types: { a: 'boolean', b: 'boolean' },
      })
    })
  })
})
