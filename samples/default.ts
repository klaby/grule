import { Engine } from '../lib/engine'
import { IRules } from '../src/interfaces'

type IUser = {
  id: number
  gender: 'male' | 'female'
}

const engine = new Engine<IUser>({ id: 1, gender: 'male' })

const rules: IRules<IUser> = ({ id, gender }, { when }) => ({
  id: when(id.greater(1)).then(result => {
    if (result) throw new Error('Validation failed to "id".')

    return result
  }),
  gender: gender.in(['female']),
})

engine.run(rules)
