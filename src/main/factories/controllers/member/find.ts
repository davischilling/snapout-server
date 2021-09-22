import { FindMembersController } from '@/main/controllers'
import { makeFindMembers } from '@/main/factories/services'

export const makeFindMembersController = async (): Promise<FindMembersController> => {
  const findMembersService = await makeFindMembers()
  return new FindMembersController(findMembersService)
}
