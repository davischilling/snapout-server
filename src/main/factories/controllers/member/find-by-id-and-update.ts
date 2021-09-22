import { FindMemberByIdAndUpdateController } from '@/main/controllers'
import { makeFindMemberByIdAndUpdate } from '@/main/factories/services'

export const makeFindMemberByIdAndUpdateController = async (): Promise<FindMemberByIdAndUpdateController> => {
  const findMemberByIdAndUpdateService = await makeFindMemberByIdAndUpdate()
  return new FindMemberByIdAndUpdateController(findMemberByIdAndUpdateService)
}
