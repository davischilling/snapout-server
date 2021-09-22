import { FindContactByIdController } from '@/main/controllers'
import { makeFindContactById } from '@/main/factories/services'

export const makeFindContactByIdController = async (): Promise<FindContactByIdController> => {
  const findContactByIdService = await makeFindContactById()
  return new FindContactByIdController(findContactByIdService)
}
