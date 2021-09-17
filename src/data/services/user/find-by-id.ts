import { FindUserByIdService } from '@/domain/use-cases'
import { Repository as UserDbRepo } from '@/data/contracts/repos'

type setup = (
  userRepo: UserDbRepo,
) => FindUserByIdService

export const setupFindUserById: setup = (userRepo) => async ({ id }) => {
  return await userRepo.findById(id)
}
