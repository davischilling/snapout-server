import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { Contact } from '@/data/entities'
import { CreateContactService } from '@/domain/use-cases'

type setup = (
  contactRepo: ContactDbRepo,
) => CreateContactService

export const setupCreateContact: setup = (contactRepo) => async (params) => {
  const newContact = new Contact(params)
  const id = await contactRepo.create(newContact)
  return { id }
}
