import { FindMemberByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'

type setup = (
  memberRepo: MemberDbRepo,
) => FindMemberByIdAndDeleteService

export const setupFindMemberByIdAndDelete: setup = (memberRepo) => async ({ id }) => {
  const deletedMemberId = await memberRepo.findByIdAndDelete(id)
  return { id: deletedMemberId }
}
