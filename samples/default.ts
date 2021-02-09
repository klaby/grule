import { Grule } from '../lib/grule'

type IUser = {
  id: number
  gender: 'male' | 'female'
}

const grule = new Grule<IUser>({ id: 1, gender: 'male' }).run(
  ({ id, gender }, { when }) => ({
    id: when(id.notIn([1, 2, 3])).then(result => {
      if (result) throw new Error('Not allowed for user.')
      return result
    }),
    gender: gender.equal('female'),
  }),
)
