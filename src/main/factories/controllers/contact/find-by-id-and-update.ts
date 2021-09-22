import { FindContactByIdAndUpdateController } from '@/main/controllers'
import { makeFindContactByIdAndUpdate } from '@/main/factories/services'

export const makeFindContactByIdAndUpdateController = async (): Promise<FindContactByIdAndUpdateController> => {
  const findContactByIdAndUpdateService = await makeFindContactByIdAndUpdate()
  return new FindContactByIdAndUpdateController(findContactByIdAndUpdateService)
}
