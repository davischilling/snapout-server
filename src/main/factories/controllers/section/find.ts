import { FindSectionsController } from '@/main/controllers'
import { makeFindSections } from '@/main/factories/services'

export const makeFindSectionsController = async (): Promise<FindSectionsController> => {
  const findSectionsService = await makeFindSections()
  return new FindSectionsController(findSectionsService)
}
