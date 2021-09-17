import { FindRecipeItemByIdAndDeleteService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { setupFindRecipeItemByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/recipeItem')

describe('FindRecipeItemByIdAndDeleteService', () => {
  let id: string
  let recipeItemAccountRepo: MockProxy<RecipeItemDbRepo>
  let sut: FindRecipeItemByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    recipeItemAccountRepo = mock()
    recipeItemAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindRecipeItemByIdAndDelete(recipeItemAccountRepo)
  })

  it('should call RecipeItemAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(recipeItemAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(recipeItemAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if RecipeItemAccountRepo.findByIdAndDelete throws', async () => {
    recipeItemAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted recipeItem id on success', async () => {
    const recipeItemFindByIdResult = await sut({ id })

    expect(recipeItemFindByIdResult).toEqual({ id })
  })
})
