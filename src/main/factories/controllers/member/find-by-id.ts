import { FindMemberByIdController } from '@/main/controllers'
import { makeFindMemberById } from '@/main/factories/services'

export const makeFindMemberByIdController = async (): Promise<FindMemberByIdController> => {
  const findMemberByIdService = await makeFindMemberById()
  return new FindMemberByIdController(findMemberByIdService)
}
