import { CreateSectionController } from '@/main/controllers'
import { makeCreateSection } from '@/main/factories/services'

export const makeCreateSectionController = async (): Promise<CreateSectionController> => {
  const createSectionService = await makeCreateSection()
  return new CreateSectionController(createSectionService)
}
