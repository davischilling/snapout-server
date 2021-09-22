import { FindParagraphsController } from '@/main/controllers'
import { makeFindParagraphs } from '@/main/factories/services'

export const makeFindParagraphsController = async (): Promise<FindParagraphsController> => {
  const findParagraphsService = await makeFindParagraphs()
  return new FindParagraphsController(findParagraphsService)
}
