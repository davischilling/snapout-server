import { CreateUserService } from '@/domain/use-cases'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { UnauthorizedError } from '@/data/errors'
import { User } from '@/data/entities'

type setup = (
  userRepo: UserDbRepo,
) => CreateUserService

export const setupCreateUser: setup = (userRepo) => async (params) => {
  const users = await userRepo.find({ accountId: params.accountId })
  if (users.items !== 0) {
    throw new UnauthorizedError('User already exists')
  }
  const newUser = new User(params)
  const id = await userRepo.create(newUser)
  return { id }
}
