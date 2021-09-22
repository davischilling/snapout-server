import { FindSectionByIdController } from '@/main/controllers'
import { makeFindSectionById } from '@/main/factories/services'

export const makeFindSectionByIdController = async (): Promise<FindSectionByIdController> => {
  const findSectionByIdService = await makeFindSectionById()
  return new FindSectionByIdController(findSectionByIdService)
}
