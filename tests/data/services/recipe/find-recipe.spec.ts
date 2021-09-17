import { FindRecipesService } from '@/domain/use-cases/recipe'
import { Repository as RecipeDbRepo } from '@/data/contracts/repos'
import { setupFindRecipes } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/recipe')

describe('FindRecipesService', () => {
  let recipeAccountRepo: MockProxy<RecipeDbRepo>
  let sut: FindRecipesService

  beforeAll(() => {
    recipeAccountRepo = mock()
    recipeAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindRecipes(recipeAccountRepo)
  })

  it('should call RecipeAccountRepo.find with correct params', async () => {
    await sut({ data: 'any' })

    expect(recipeAccountRepo.find).toHaveBeenCalledWith({ data: 'any' })
    expect(recipeAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const recipeFindResult = await sut({})

    expect(recipeFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if RecipeAccountRepo.find throws', async () => {
    recipeAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
