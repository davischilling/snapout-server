import { FindContactByIdAndDeleteService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'

type setup = (
  contactRepo: ContactDbRepo,
) => FindContactByIdAndDeleteService

export const setupFindContactByIdAndDelete: setup = (contactRepo) => async ({ id }) => {
  const deletedContactId = await contactRepo.findByIdAndDelete(id)
  return { id: deletedContactId }
}
