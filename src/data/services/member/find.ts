import { FindMembersService } from '@/domain/use-cases'
import { Repository as MemberDbRepo } from '@/data/contracts/repos'

type setup = (
  memberRepo: MemberDbRepo,
) => FindMembersService

export const setupFindMembers: setup = (memberRepo) => async (params) => {
  return await memberRepo.find(params)
}
