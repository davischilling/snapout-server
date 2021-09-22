import { CreateParagraphController } from '@/main/controllers'
import { makeCreateParagraph } from '@/main/factories/services'

export const makeCreateParagraphController = async (): Promise<CreateParagraphController> => {
  const createParagraphService = await makeCreateParagraph()
  return new CreateParagraphController(createParagraphService)
}
