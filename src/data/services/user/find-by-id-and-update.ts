import { FindUserByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as UserDbRepo } from '@/data/contracts/repos'
import { User } from '@/data/entities'

type setup = (
  userRepo: UserDbRepo,
) => FindUserByIdAndUpdateService

export const setupFindUserByIdAndUpdate: setup = (userRepo) => async params => {
  const user: User = await userRepo.findById(params.id)
  const updatedUser = User.update(user, params)
  return await userRepo.findByIdAndUpdate(params.id, updatedUser)
}
