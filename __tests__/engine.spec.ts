import { Engine } from '../lib/engine'
import { IEngine } from '../src/interfaces'
import { $equal, $in } from '../src/operators'
import { $when, $throw } from '../src/events'

export interface IFoo {
  id: number
  name: 'foo' | 'bar'
}

describe('Engine', () => {
  let engine: Engine

  it('should be defined', () => {
    engine = new Engine()

    expect(engine).toBeDefined()
    expect(engine.context).toBeDefined()
    expect(engine.status).toBeDefined()
  })

  describe('Subscribe', () => {
    engine = new Engine()

    it('should subscribe the rules and facts and create a new context', () => {
      const rules: IEngine.IRules<IFoo> = data => ({
        id: $when($equal(1, data.id)),
        name: $when($in(['bar', 'foo'], data.name)),
      })

      const facts: IEngine.IFacts<IFoo> = {
        id: 1,
        name: 'bar',
      }

      engine.subscribe(rules, facts)

      expect(engine.context).toEqual({
        id: {
          event: undefined,
          method: '$equal',
          status: 'failed',
          values: { expected: 1, sended: 1 },
        },
        name: {
          event: undefined,
          method: '$in',
          status: 'failed',
          values: { expected: 'bar', sended: ['bar', 'foo'] },
        },
      })
    })
  })

  describe('Run', () => {
    engine = new Engine()

    it('should register the rules and facts and run the tests returned success', () => {
      const rules: IEngine.IRules<IFoo> = data => ({
        id: $when($equal(1, data.id)),
        name: $when($in(['bar', 'buu'], data.name)),
      })

      const facts: IEngine.IFacts<IFoo> = {
        id: 2,
        name: 'foo',
      }

      engine.subscribe(rules, facts).run()

      expect(engine.status).toBe('success')
      expect(engine.context).toEqual({
        id: {
          event: undefined,
          method: '$equal',
          status: 'success',
          values: { expected: 2, sended: 1 },
        },
        name: {
          event: undefined,
          method: '$in',
          status: 'success',
          values: { expected: 'foo', sended: ['bar', 'buu'] },
        },
      })
    })

    it('should register the rules and facts and run the tests returned failed', () => {
      const rules: IEngine.IRules<IFoo> = data => ({
        id: $when($equal(1, data.id)),
        name: $when($in(['bar', 'buu'], data.name)),
      })

      const facts: IEngine.IFacts<IFoo> = {
        id: 1,
        name: 'foo',
      }

      engine.subscribe(rules, facts).run()

      expect(engine.status).toBe('failed')
      expect(engine.context).toEqual({
        id: {
          event: undefined,
          method: '$equal',
          status: 'failed',
          values: { expected: 1, sended: 1 },
        },
        name: {
          event: undefined,
          method: '$in',
          status: 'success',
          values: { expected: 'foo', sended: ['bar', 'buu'] },
        },
      })
    })

    it('should register the rules and facts and run the tests returned error', () => {
      const rules: IEngine.IRules<IFoo> = data => ({
        id: $when($equal(1, data.id), $throw('User not alowed')),
        name: $when($in(['bar', 'buu'], data.name)),
      })

      const facts: IEngine.IFacts<IFoo> = {
        id: 1,
        name: 'foo',
      }

      expect(() => engine.subscribe(rules, facts).run()).toThrow()
    })
  })
})
