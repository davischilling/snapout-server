import { CreateContactController } from '@/main/controllers'
import { makeCreateContact } from '@/main/factories/services'

export const makeCreateContactController = async (): Promise<CreateContactController> => {
  const createContactService = await makeCreateContact()
  return new CreateContactController(createContactService)
}
