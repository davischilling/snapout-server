import { FindParagraphByIdAndDeleteController } from '@/main/controllers'
import { makeFindParagraphByIdAndDelete } from '@/main/factories/services'

export const makeFindParagraphByIdAndDeleteController = async (): Promise<FindParagraphByIdAndDeleteController> => {
  const findParagraphByIdAndDeleteService = await makeFindParagraphByIdAndDelete()
  return new FindParagraphByIdAndDeleteController(findParagraphByIdAndDeleteService)
}
