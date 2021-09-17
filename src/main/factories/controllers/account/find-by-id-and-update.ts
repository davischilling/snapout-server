import { FindAccountByIdAndUpdateController } from '@/main/controllers'
import { makeFindAccountByIdAndUpdate } from '@/main/factories/services'

export const makeFindAccountByIdAndUpdateController = async (): Promise<FindAccountByIdAndUpdateController> => {
  return new FindAccountByIdAndUpdateController(await makeFindAccountByIdAndUpdate())
}
