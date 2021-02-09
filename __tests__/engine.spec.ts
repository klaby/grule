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

  it('should return true for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.equal(50),
      name: name.equal('foo'),
    })

    expect(engine.run(rules)).resolves.toBe(true)
  })

  it('should return true for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.less(51),
      name: name.in(['foo']),
    })

    expect(engine.run(rules)).resolves.toBe(true)
  })

  it('should return true for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.lessOrEqual(50),
      name: name.notIn(['bar']),
    })

    expect(engine.run(rules)).resolves.toBe(true)
  })

  it('should return false for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greater(50),
      name: name.in(['bar']),
    })

    expect(engine.run(rules)).resolves.toBe(false)
  })

  it('should return false for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greater(50),
      name: name.in(['bar']),
    })

    expect(engine.run(rules)).resolves.toBe(false)
  })

  it('should return false for validation', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greaterOrEqual(50),
      name: name.diff('foo'),
    })

    expect(engine.run(rules)).resolves.toBe(false)
  })

  it('should perform the equal function and return true', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greaterOrEqual(50),
      name: name.eval('equal', 'foo'),
    })

    expect(engine.run(rules)).resolves.toBe(true)
  })

  it('should return error for undefined metadata', async () => {
    engine = new Engine({} as any)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greaterOrEqual(50),
      name: name.eval('equal', 'foo'),
    })

    expect(engine.run(rules)).rejects.toThrow(
      'No attributes defined in metadata.',
    )
  })

  it('should return error for a rule that has no metadata defined', async () => {
    engine = new Engine(metadata)

    const rules: IRules<IUser> = ({ id, name }) => ({
      id: id.greaterOrEqual(50),
      name: name.eval('equal', 'foo'),
      foo: id.less(20),
    })

    expect(engine.run(rules)).rejects.toThrow(
      'There is no value defined in the metadata for the rule "foo".',
    )
  })

  it('should return the value 1 for the attribute $value.', async () => {
    new Engine({ id: 1 }).run(({ id }) => {
      expect(id.$value).toBe(1)

      return {
        id: id.greaterOrEqual(50),
      }
    })
  })
})
