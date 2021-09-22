import { FindContactsService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'

type setup = (
  contactRepo: ContactDbRepo,
) => FindContactsService

export const setupFindContacts: setup = (contactRepo) => async (params) => {
  return await contactRepo.find(params)
}
