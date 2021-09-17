import { FindTypeOfMealsService } from '@/domain/use-cases/typeOfMeal'
import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { setupFindTypeOfMeals } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/typeOfMeal')

describe('FindTypeOfMealsService', () => {
  let typeOfMealAccountRepo: MockProxy<TypeOfMealDbRepo>
  let sut: FindTypeOfMealsService

  beforeAll(() => {
    typeOfMealAccountRepo = mock()
    typeOfMealAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindTypeOfMeals(typeOfMealAccountRepo)
  })

  it('should call TypeOfMealAccountRepo.find with correct params', async () => {
    await sut({ data: 'any' })

    expect(typeOfMealAccountRepo.find).toHaveBeenCalledWith({ data: 'any' })
    expect(typeOfMealAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const typeOfMealFindResult = await sut({})

    expect(typeOfMealFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if TypeOfMealAccountRepo.find throws', async () => {
    typeOfMealAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
