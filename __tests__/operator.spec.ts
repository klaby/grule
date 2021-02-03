import { Exception } from '../lib/exception'
import { Operator } from '../lib/operator'

describe('Operator', () => {
  describe('IsArrayOrJSON', () => {
    const operator = new Operator()

    it('should return true to the "array" type', () => {
      expect(operator.isArrayOrJSON('array')).toBe(true)
    })

    it('should return true to the "json" type', () => {
      expect(operator.isArrayOrJSON('json')).toBe(true)
    })

    it('should return false to the "bool" type', () => {
      expect(operator.isArrayOrJSON('bool')).toBe(false)
    })

    it('should return false to the "number" type', () => {
      expect(operator.isArrayOrJSON('number')).toBe(false)
    })

    it('should return false to the "string" type', () => {
      expect(operator.isArrayOrJSON('string')).toBe(false)
    })
  })

  describe('IsLogicOperator', () => {
    const operator = new Operator()

    it('should return true to the "$less" method', () => {
      expect(operator.isLogicOperator('$less')).toBe(true)
    })

    it('should return true to the "$lessOrEqual" method', () => {
      expect(operator.isLogicOperator('$lessOrEqual')).toBe(true)
    })

    it('should return true to the "$greater" method', () => {
      expect(operator.isLogicOperator('$greaterOrEqual')).toBe(true)
    })

    it('should return true to the "$greaterOrEqual" method', () => {
      expect(operator.isLogicOperator('$greaterOrEqual')).toBe(true)
    })

    it('should return true to the "$equal" method', () => {
      expect(operator.isLogicOperator('$equal')).toBe(true)
    })

    it('should return true to the "$diff" method', () => {
      expect(operator.isLogicOperator('$diff')).toBe(true)
    })

    it('should return false to the "$in" method', () => {
      expect(operator.isLogicOperator('$in')).toBe(false)
    })

    it('should return false to the "$notIn" method', () => {
      expect(operator.isLogicOperator('$notIn')).toBe(false)
    })
  })

  describe('IsValidMethod', () => {
    const operator = new Operator()

    describe('$less', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$less', 'number')).toBe(true)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$less', 'bool')).toBe(false)
      })

      it('should return false for the "string" data type', () => {
        expect(operator.isValidMethod('$less', 'string')).toBe(false)
      })

      it('should return false for the "array" data type', () => {
        expect(operator.isValidMethod('$less', 'array')).toBe(false)
      })

      it('should return false for the "json" data type', () => {
        expect(operator.isValidMethod('$less', 'json')).toBe(false)
      })
    })

    describe('$lessOrEqual', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$lessOrEqual', 'number')).toBe(true)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$lessOrEqual', 'bool')).toBe(false)
      })

      it('should return false for the "string" data type', () => {
        expect(operator.isValidMethod('$lessOrEqual', 'string')).toBe(false)
      })

      it('should return false for the "array" data type', () => {
        expect(operator.isValidMethod('$lessOrEqual', 'array')).toBe(false)
      })

      it('should return false for the "json" data type', () => {
        expect(operator.isValidMethod('$lessOrEqual', 'json')).toBe(false)
      })
    })

    describe('$greater', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$greater', 'number')).toBe(true)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$greater', 'bool')).toBe(false)
      })

      it('should return false for the "string" data type', () => {
        expect(operator.isValidMethod('$greater', 'string')).toBe(false)
      })

      it('should return false for the "array" data type', () => {
        expect(operator.isValidMethod('$greater', 'array')).toBe(false)
      })

      it('should return false for the "json" data type', () => {
        expect(operator.isValidMethod('$greater', 'json')).toBe(false)
      })
    })

    describe('$greaterOrEqual', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$greaterOrEqual', 'number')).toBe(true)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$greaterOrEqual', 'bool')).toBe(false)
      })

      it('should return false for the "string" data type', () => {
        expect(operator.isValidMethod('$greaterOrEqual', 'string')).toBe(false)
      })

      it('should return false for the "array" data type', () => {
        expect(operator.isValidMethod('$greaterOrEqual', 'array')).toBe(false)
      })

      it('should return false for the "json" data type', () => {
        expect(operator.isValidMethod('$greaterOrEqual', 'json')).toBe(false)
      })
    })

    describe('$equal', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$equal', 'number')).toBe(true)
      })

      it('should return true for the "string" data type', () => {
        expect(operator.isValidMethod('$equal', 'string')).toBe(true)
      })

      it('should return true for the "bool" data type', () => {
        expect(operator.isValidMethod('$equal', 'bool')).toBe(true)
      })

      it('should return true for the "array" data type', () => {
        expect(operator.isValidMethod('$equal', 'array')).toBe(true)
      })

      it('should return true for the "json" data type', () => {
        expect(operator.isValidMethod('$equal', 'json')).toBe(true)
      })
    })

    describe('$diff', () => {
      it('should return true for the "number" data type', () => {
        expect(operator.isValidMethod('$diff', 'number')).toBe(true)
      })

      it('should return true for the "string" data type', () => {
        expect(operator.isValidMethod('$diff', 'string')).toBe(true)
      })

      it('should return true for the "bool" data type', () => {
        expect(operator.isValidMethod('$diff', 'bool')).toBe(true)
      })

      it('should return true for the "array" data type', () => {
        expect(operator.isValidMethod('$diff', 'array')).toBe(true)
      })

      it('should return true for the "json" data type', () => {
        expect(operator.isValidMethod('$diff', 'json')).toBe(true)
      })
    })

    describe('$in', () => {
      it('should return true for the "json" data type', () => {
        expect(operator.isValidMethod('$in', 'json')).toBe(true)
      })

      it('should return true for the "string" data type', () => {
        expect(operator.isValidMethod('$in', 'string')).toBe(true)
      })

      it('should return true for the "array" data type', () => {
        expect(operator.isValidMethod('$in', 'array')).toBe(true)
      })

      it('should return false for the "number" data type', () => {
        expect(operator.isValidMethod('$in', 'number')).toBe(false)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$in', 'bool')).toBe(false)
      })
    })

    describe('$notIn', () => {
      it('should return true for the "json" data type', () => {
        expect(operator.isValidMethod('$notIn', 'json')).toBe(true)
      })

      it('should return true for the "string" data type', () => {
        expect(operator.isValidMethod('$notIn', 'string')).toBe(true)
      })

      it('should return true for the "array" data type', () => {
        expect(operator.isValidMethod('$notIn', 'array')).toBe(true)
      })

      it('should return false for the "number" data type', () => {
        expect(operator.isValidMethod('$notIn', 'number')).toBe(false)
      })

      it('should return false for the "bool" data type', () => {
        expect(operator.isValidMethod('$notIn', 'bool')).toBe(false)
      })
    })
  })

  describe('TypeCheck', () => {
    const operator = new Operator()

    it('should return "string" to the value ("foo")', () => {
      expect(operator.typeCheck('foo')).toBe('string')
    })

    it('should return "string" to the value ("1")', () => {
      expect(operator.typeCheck('1')).toBe('string')
    })

    it('should return "string" to the value ("{"foo":"foo"}")', () => {
      expect(operator.typeCheck('{"foo":"foo"}')).toBe('string')
    })

    it('should return "string" to the value ("[1,2]")', () => {
      expect(operator.typeCheck('[1,2]')).toBe('string')
    })

    it('should return "string" to the value ("true")', () => {
      expect(operator.typeCheck('true')).toBe('string')
    })

    it('should return "number" to the value (1)', () => {
      expect(operator.typeCheck(1)).toBe('number')
    })

    it('should return "json" to the value ({"foo":"foo"})', () => {
      expect(operator.typeCheck({ foo: 'foo' })).toBe('json')
    })

    it('should return "array" to the value ([1,2])', () => {
      expect(operator.typeCheck([1, 2])).toBe('array')
    })

    it('should return "bool" to the value (true)', () => {
      expect(operator.typeCheck(true)).toBe('bool')
    })
  })

  describe('TypeEquals', () => {
    const operator = new Operator()

    it('should return true to $a="foo" and $b="bar"', () => {
      expect(operator.typeEquals('foo', 'bar')).toBe(true)
    })

    it('should return true to $a=1 and $b=50', () => {
      expect(operator.typeEquals(1, 50)).toBe(true)
    })

    it('should return true to $a="{"foo":"foo"}" and $b="{"bar":"bar"}', () => {
      expect(operator.typeEquals('{"foo":"foo"}', '{"bar":"bar"}')).toBe(true)
    })

    it('should return true to $a="[1,2]" and $b="[1,2,45,87]"', () => {
      expect(operator.typeEquals('[1,2]', '[1,2,45,87]')).toBe(true)
    })

    it('should return true to $a="true" and $b="false"', () => {
      expect(operator.typeEquals('true', 'false')).toBe(true)
    })

    it('should return true to $a="foo" and $b=1', () => {
      expect(operator.typeEquals('foo', 1)).toBe(false)
    })

    it('should return true to $a=true and $b=1', () => {
      expect(operator.typeEquals(true, 1)).toBe(false)
    })

    it('should return true to $a=[1,2] and $b={"bar":"bar"}', () => {
      expect(operator.typeEquals([1, 2], { bar: 'bar' })).toBe(false)
    })
  })

  describe('ToString', () => {
    const operator = new Operator()

    it('should return "{"bar":"bar"}" to the value { bar: "bar" }', () => {
      expect(operator.toString({ bar: 'bar' })).toBe('{"bar":"bar"}')
    })

    it('should return "1" to the value 1', () => {
      expect(operator.toString(1)).toBe('1')
    })

    it('should return "foo" to the value "foo"', () => {
      expect(operator.toString('foo')).toBe('foo')
    })

    it('should return "[1,2,3]" to the value [1,2,3]', () => {
      expect(operator.toString([1, 2, 3])).toBe('[1,2,3]')
    })

    it('should return "[1,2,3]" to the value "[1,2,3]"', () => {
      expect(operator.toString('[1,2,3]')).toBe('[1,2,3]')
    })
  })

  describe('Subscribe', () => {
    it('should record a context', () => {
      const operator = new Operator()

      operator.subscribe('$less', { $a: 1, $b: 50 })

      expect(operator.validate()).toEqual({
        context: {
          data: { equals: true, type: 'number' },
          method: '$less',
          values: { $a: 1, $b: 50 },
        },
      })
    })
  })

  describe('Validade', () => {
    it('should return successful in validating numbers using the $equal method', () => {
      const operator = new Operator()

      operator.subscribe('$equal', { $a: 'foo', $b: 'foo' })

      expect(operator.validate()).toEqual({
        context: {
          data: { equals: true, type: 'string' },
          method: '$equal',
          values: { $a: 'foo', $b: 'foo' },
        },
      })
    })

    it('should return an error if the types of data are different', () => {
      const operator = new Operator()

      try {
        operator.subscribe('$diff', { $a: 1, $b: true }).validate()
      } catch (error) {
        expect(error.message).toBe('The informed data has different types.')
      }
    })

    it('should return an error the type of data is different from what the method expects', async () => {
      const operator = new Operator()

      try {
        operator.subscribe('$in', { $a: 1, $b: 50 }).validate()
      } catch (error) {
        expect(error.message).toBe(
          'Method ($in) not active for number data type.',
        )
      }
    })
  })

  describe('Builder', () => {
    const operator = new Operator()

    describe('$less', () => {
      it('should return a true for the expression 1 < 4', async () => {
        expect(
          await operator.builder('$less', 'number', { $a: 1, $b: 4 }),
        ).toBe(true)
      })

      it('should return a false for the expression 1 < 1', async () => {
        expect(
          await operator.builder('$less', 'number', { $a: 1, $b: 1 }),
        ).toBe(false)
      })
    })

    describe('$lessOrEqual', () => {
      it('should return a true for the expression 1 <= 1', async () => {
        expect(
          await operator.builder('$lessOrEqual', 'number', { $a: 1, $b: 1 }),
        ).toBe(true)
      })

      it('should return a false for the expression 2 <= 1', async () => {
        expect(
          await operator.builder('$lessOrEqual', 'number', { $a: 2, $b: 1 }),
        ).toBe(false)
      })
    })

    describe('$greater', () => {
      it('should return a true for the expression 4 > 1', async () => {
        expect(
          await operator.builder('$greater', 'number', { $a: 4, $b: 1 }),
        ).toBe(true)
      })

      it('should return a false for the expression 4 > 4', async () => {
        expect(
          await operator.builder('$greater', 'number', { $a: 4, $b: 4 }),
        ).toBe(false)
      })
    })

    describe('$greaterOrEqual', () => {
      it('should return a true for the expression 4 >= 4', async () => {
        expect(
          await operator.builder('$greaterOrEqual', 'number', { $a: 4, $b: 4 }),
        ).toBe(true)
      })

      it('should return a false for the expression 3 >= 4', async () => {
        expect(
          await operator.builder('$greaterOrEqual', 'number', { $a: 3, $b: 4 }),
        ).toBe(false)
      })
    })

    describe('$equal', () => {
      it('should return a true for the expression 4 === 4', async () => {
        expect(
          await operator.builder('$equal', 'number', { $a: 4, $b: 4 }),
        ).toBe(true)
      })

      it('should return a true for the expression "[1,2]" === "[1,2]"', async () => {
        expect(
          await operator.builder('$equal', 'array', {
            $a: '[1,2]',
            $b: '[1,2]',
          }),
        ).toBe(true)
      })

      it('should return a true for the expression [1,2] === [1,2]', async () => {
        expect(
          await operator.builder('$equal', 'array', {
            $a: [1, 2],
            $b: [1, 2],
          }),
        ).toBe(true)
      })

      it('should return a true for the expression {foo:"a"} === {foo:"a"}', async () => {
        expect(
          await operator.builder('$equal', 'json', {
            $a: { foo: 'a' },
            $b: { foo: 'a' },
          }),
        ).toBe(true)
      })

      it('should return a true for the expression "{foo:"a"}" === "{foo:"a"}"', async () => {
        expect(
          await operator.builder('$equal', 'json', {
            $a: "{ foo: 'a' }",
            $b: "{ foo: 'a' }",
          }),
        ).toBe(true)
      })

      it('should return a true for the expression false === false"', async () => {
        expect(
          await operator.builder('$equal', 'bool', {
            $a: false,
            $b: false,
          }),
        ).toBe(true)
      })

      it('should return a false for the expression false === true"', async () => {
        expect(
          await operator.builder('$equal', 'bool', {
            $a: false,
            $b: true,
          }),
        ).toBe(false)
      })

      it('should return a false for the expression [1,2] === [1,3]', async () => {
        expect(
          await operator.builder('$equal', 'array', {
            $a: [1, 2],
            $b: [1, 3],
          }),
        ).toBe(false)
      })

      it('should return a false for the expression "foo" === "bar"', async () => {
        expect(
          await operator.builder('$equal', 'string', { $a: 'foo', $b: 'bar' }),
        ).toBe(false)
      })
    })

    describe('$diff', () => {
      it('should return a true for the expression 4 !== 5', async () => {
        expect(
          await operator.builder('$diff', 'number', { $a: 4, $b: 5 }),
        ).toBe(true)
      })

      it('should return a false for the expression 4 !== 4', async () => {
        expect(
          await operator.builder('$diff', 'number', { $a: 4, $b: 4 }),
        ).toBe(false)
      })

      it('should return a false for the expression "foo" !== "foo"', async () => {
        expect(
          await operator.builder('$diff', 'string', { $a: 'foo', $b: 'foo' }),
        ).toBe(false)
      })
    })

    describe('$in', () => {
      it('should return a true for the expression "ab".includes("a")', async () => {
        expect(
          await operator.builder('$in', 'string', { $a: 'ab', $b: 'a' }),
        ).toBe(true)
      })

      it('should return a true for the expression ["a", "b"].includes("a")', async () => {
        expect(
          await operator.builder('$in', 'array', { $a: ['a', 'b'], $b: 'a' }),
        ).toBe(true)
      })

      it('should return a false for the expression "ab".includes("c")', async () => {
        expect(
          await operator.builder('$in', 'string', { $a: 'ab', $b: 'c' }),
        ).toBe(false)
      })
    })

    describe('$notIn', () => {
      it('should return a true for the expression !"ab".includes("c")', async () => {
        expect(
          await operator.builder('$notIn', 'string', { $a: 'ab', $b: 'c' }),
        ).toBe(true)
      })

      it('should return a true for the expression !["a", "b"].includes("b")', async () => {
        expect(
          await operator.builder('$notIn', 'string', {
            $a: ['a', 'b'],
            $b: 'b',
          }),
        ).toBe(false)
      })
    })
  })

  describe('Run', () => {
    it('should return true to true === true', async () => {
      const operator = new Operator()

      operator.subscribe('$equal', { $a: true, $b: true })

      expect(await operator.run()).toBe(true)
    })

    it('should return an error for different data types', async () => {
      const operator = new Operator()

      operator.subscribe('$equal', { $a: true, $b: 5 })

      expect(operator.run()).rejects.toBeInstanceOf(Exception)
    })
  })
})
