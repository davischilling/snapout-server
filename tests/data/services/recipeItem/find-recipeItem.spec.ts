import { FindRecipeItemsService } from '@/domain/use-cases/recipeItem'
import { Repository as RecipeItemDbRepo } from '@/data/contracts/repos'
import { setupFindRecipeItems } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/recipeItem')

describe('FindRecipeItemsService', () => {
  let recipeItemAccountRepo: MockProxy<RecipeItemDbRepo>
  let sut: FindRecipeItemsService

  beforeAll(() => {
    recipeItemAccountRepo = mock()
    recipeItemAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindRecipeItems(recipeItemAccountRepo)
  })

  it('should call RecipeItemAccountRepo.find with correct params', async () => {
    await sut({ data: 'any' })

    expect(recipeItemAccountRepo.find).toHaveBeenCalledWith({ data: 'any' })
    expect(recipeItemAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const recipeItemFindResult = await sut({})

    expect(recipeItemFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if RecipeItemAccountRepo.find throws', async () => {
    recipeItemAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
