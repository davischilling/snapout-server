import { FindSectionByIdAndDeleteController } from '@/main/controllers'
import { makeFindSectionByIdAndDelete } from '@/main/factories/services'

export const makeFindSectionByIdAndDeleteController = async (): Promise<FindSectionByIdAndDeleteController> => {
  const findSectionByIdAndDeleteService = await makeFindSectionByIdAndDelete()
  return new FindSectionByIdAndDeleteController(findSectionByIdAndDeleteService)
}
