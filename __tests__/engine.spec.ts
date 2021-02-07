import { IRules } from '../src/interfaces'
import { Engine } from '../lib/engine'

describe('Engine', () => {
  type IUser = {
    id: number
    name: string
  }

  let engine: Engine<IUser>

  const metadata: IUser = {
    id: 50,
    name: 'foo',
  }

  it('should return true for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.equal(50),
      name: name.equal('foo'),
    })

    expect(engine.subscribe(rules).run()).toBe(true)
  })

  it('should return true for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.less(51),
      name: name.in(['foo']),
    })

    expect(engine.subscribe(rules).run()).toBe(true)
  })

  it('should return true for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.lessOrEqual(50),
      name: name.notIn(['bar']),
    })

    expect(engine.subscribe(rules).run()).toBe(true)
  })

  it('should return false for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greater(50),
      name: name.in(['bar']),
    })

    expect(engine.subscribe(rules).run()).toBe(false)
  })

  it('should return false for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greater(50),
      name: name.in(['bar']),
    })

    expect(engine.subscribe(rules).run()).toBe(false)
  })

  it('should return false for validation', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greaterOrEqual(50),
      name: name.diff('foo'),
    })

    expect(engine.subscribe(rules).run()).toBe(false)
  })

  it('should return error for undefined rules', () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) =>
      ({
        id: id.equal(50),
      } as any)

    expect(() => engine.subscribe(rules).run()).toThrow(
      'No rules defined for the "name" attribute.',
    )
  })
})
