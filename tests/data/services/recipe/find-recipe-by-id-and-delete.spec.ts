import { FindRecipeByIdAndDeleteService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { setupFindRecipeByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/recipe')

describe('FindRecipeByIdAndDeleteService', () => {
  let id: string
  let recipeAccountRepo: MockProxy<RecipeDbRepo>
  let sut: FindRecipeByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    recipeAccountRepo = mock()
    recipeAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindRecipeByIdAndDelete(recipeAccountRepo)
  })

  it('should call RecipeAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(recipeAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(recipeAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if RecipeAccountRepo.findByIdAndDelete throws', async () => {
    recipeAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted recipe id on success', async () => {
    const recipeFindByIdResult = await sut({ id })

    expect(recipeFindByIdResult).toEqual({ id })
  })
})
