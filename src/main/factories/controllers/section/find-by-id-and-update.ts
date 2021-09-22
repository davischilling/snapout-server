import { FindSectionByIdAndUpdateController } from '@/main/controllers'
import { makeFindSectionByIdAndUpdate } from '@/main/factories/services'

export const makeFindSectionByIdAndUpdateController = async (): Promise<FindSectionByIdAndUpdateController> => {
  const findSectionByIdAndUpdateService = await makeFindSectionByIdAndUpdate()
  return new FindSectionByIdAndUpdateController(findSectionByIdAndUpdateService)
}
