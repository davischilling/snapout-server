import { FindContactByIdService } from '@/domain/use-cases'
import { Repository as ContactDbRepo } from '@/data/contracts/repos'

type setup = (
  contactRepo: ContactDbRepo,
) => FindContactByIdService

export const setupFindContactById: setup = (contactRepo) => async ({ id }) => {
  return await contactRepo.findById(id)
}
