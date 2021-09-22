import { FindContactByIdAndDeleteController } from '@/main/controllers'
import { makeFindContactByIdAndDelete } from '@/main/factories/services'

export const makeFindContactByIdAndDeleteController = async (): Promise<FindContactByIdAndDeleteController> => {
  const findContactByIdAndDeleteService = await makeFindContactByIdAndDelete()
  return new FindContactByIdAndDeleteController(findContactByIdAndDeleteService)
}
