import { FindContactByIdAndUpdateService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'
import { Contact } from '@/data/entities'

type setup = (
  contactRepo: ContactDbRepo,
) => FindContactByIdAndUpdateService

export const setupFindContactByIdAndUpdate: setup = (contactRepo) => async params => {
  const contact: Contact = await contactRepo.findById(params.id)
  const updatedContact = new Contact({ ...contact, ...params })
  return await contactRepo.findByIdAndUpdate(params.id, updatedContact)
}
