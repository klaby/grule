import { Engine, IEngine } from '../lib/engine'

type IUser = {
  id: number
  gender: 'male' | 'female'
}

const engine = new Engine()

const rules: IEngine.IRules<IUser> = ({ id, gender }, { $when }, { $diff }) => ({
  id: $when($diff(id, 1)),
  gender: $when($diff(gender, 'female')),
})

const facts: IEngine.IFacts<IUser> = {
  id: 1,
  gender: 'male',
}

engine.subscribe(rules, facts).run()
