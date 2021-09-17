import { FindUserByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as UserDbRepo } from '@/data/contracts/repos'

type setup = (
  userRepo: UserDbRepo,
) => FindUserByIdAndDeleteService

export const setupFindUserByIdAndDelete: setup = (userRepo) => async ({ id }) => {
  const deletedUserId = await userRepo.findByIdAndDelete(id)
  return { id: deletedUserId }
}
