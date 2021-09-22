import { FindContactsController } from '@/main/controllers'
import { makeFindContacts } from '@/main/factories/services'

export const makeFindContactsController = async (): Promise<FindContactsController> => {
  const findContactsService = await makeFindContacts()
  return new FindContactsController(findContactsService)
}
