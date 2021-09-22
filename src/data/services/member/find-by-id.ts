import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { FindMemberByIdService } from '@/domain/use-cases'

type setup = (
  memberRepo: MemberDbRepo,
) => FindMemberByIdService

export const setupFindMemberById: setup = (memberRepo) => async ({ id }) => {
  return await memberRepo.findById(id)
}
