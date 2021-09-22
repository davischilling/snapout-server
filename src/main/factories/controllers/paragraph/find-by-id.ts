import { FindParagraphByIdController } from '@/main/controllers'
import { makeFindParagraphById } from '@/main/factories/services'

export const makeFindParagraphByIdController = async (): Promise<FindParagraphByIdController> => {
  const findParagraphByIdService = await makeFindParagraphById()
  return new FindParagraphByIdController(findParagraphByIdService)
}
