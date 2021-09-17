import { FindUsersService } from '@/domain/use-cases'
import { Repository as UserDbRepo } from '@/data/contracts/repos'

type setup = (
  userRepo: UserDbRepo,
) => FindUsersService

export const setupFindUsers: setup = (userRepo) => async (params) => {
  return await userRepo.find(params)
}
