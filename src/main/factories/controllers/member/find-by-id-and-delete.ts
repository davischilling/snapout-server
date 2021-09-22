import { FindMemberByIdAndDeleteController } from '@/main/controllers'
import { makeFindMemberByIdAndDelete } from '@/main/factories/services'

export const makeFindMemberByIdAndDeleteController = async (): Promise<FindMemberByIdAndDeleteController> => {
  const findMemberByIdAndDeleteService = await makeFindMemberByIdAndDelete()
  return new FindMemberByIdAndDeleteController(findMemberByIdAndDeleteService)
}
