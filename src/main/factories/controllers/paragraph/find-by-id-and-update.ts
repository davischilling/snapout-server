import { FindParagraphByIdAndUpdateController } from '@/main/controllers'
import { makeFindParagraphByIdAndUpdate } from '@/main/factories/services'

export const makeFindParagraphByIdAndUpdateController = async (): Promise<FindParagraphByIdAndUpdateController> => {
  const findParagraphByIdAndUpdateService = await makeFindParagraphByIdAndUpdate()
  return new FindParagraphByIdAndUpdateController(findParagraphByIdAndUpdateService)
}
