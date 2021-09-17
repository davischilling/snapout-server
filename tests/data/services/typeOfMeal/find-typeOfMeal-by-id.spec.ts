import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { setupFindTypeOfMealById } from '@/data/services'
import { TypeOfMealData } from '@/domain/models'
import { FindTypeOfMealByIdService } from '@/domain/use-cases/typeOfMeal'
import { mock, MockProxy } from 'jest-mock-extended'
import mongoose from 'mongoose'


jest.mock('@/data/entities/typeOfMeal')

describe('FindTypeOfMealByIdService', () => {
  let id: string
  let typeOfMealAccountId: string
  let typeOfMeal: TypeOfMealData
  let typeOfMealAccountRepo: MockProxy<TypeOfMealDbRepo>
  let sut: FindTypeOfMealByIdService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    typeOfMealAccountId = new mongoose.Types.ObjectId().toHexString()
    typeOfMeal = {
      id,
      name: "Mock Meal"
    }
    typeOfMealAccountRepo = mock()
    typeOfMealAccountRepo.findById.mockResolvedValue(typeOfMeal)
  })

  beforeEach(() => {
    sut = setupFindTypeOfMealById(typeOfMealAccountRepo)
  })

  it('should call TypeOfMealAccountRepo.findById with correct params', async () => {
    await sut({ id })

    expect(typeOfMealAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(typeOfMealAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should return an typeOfMeal on success', async () => {
    const typeOfMealFindByIdResult = await sut({ id })

    expect(typeOfMealFindByIdResult).toEqual(typeOfMeal)
  })

  it('should rethrow if TypeOfMealAccountRepo.findById throws', async () => {
    typeOfMealAccountRepo.findById.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
