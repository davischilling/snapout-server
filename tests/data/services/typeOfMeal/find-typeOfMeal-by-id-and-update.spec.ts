import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { TypeOfMeal } from '@/data/entities'
import { setupFindTypeOfMealByIdAndUpdate } from '@/data/services'
import { TypeOfMealData } from '@/domain/models'
import { FindTypeOfMealByIdAndUpdateService } from '@/domain/use-cases/typeOfMeal'
import { mock, MockProxy } from 'jest-mock-extended'
import mongoose from 'mongoose'


jest.mock('@/data/entities/typeOfMeal')

describe('FindTypeOfMealByIdAndUpdateService', () => {
  let id: string
  let typeOfMealAccountId: string
  let typeOfMeal: TypeOfMealData
  let typeOfMealAccountRepo: MockProxy<TypeOfMealDbRepo>
  let spyTypeOfMeal: any
  let mockUpdatedTypeOfMeal: TypeOfMeal
  let sut: FindTypeOfMealByIdAndUpdateService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    typeOfMealAccountId = new mongoose.Types.ObjectId().toHexString()
    typeOfMeal = {
      id,
      name: "Mock Meal"
    }
    typeOfMealAccountRepo = mock()
    typeOfMealAccountRepo.findById.mockResolvedValue(typeOfMeal)
    mockUpdatedTypeOfMeal = new TypeOfMeal(typeOfMeal)
    spyTypeOfMeal = jest.spyOn(TypeOfMeal, 'update').mockReturnValue(mockUpdatedTypeOfMeal)
  })

  beforeEach(() => {
    sut = setupFindTypeOfMealByIdAndUpdate(typeOfMealAccountRepo)
  })

  it('should call TypeOfMealAccountRepo.findById with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(typeOfMealAccountRepo.findById).toHaveBeenCalledWith(id)
    expect(typeOfMealAccountRepo.findById).toHaveBeenCalledTimes(1)
  })

  it('should call TypeOfMeal entity update method with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(spyTypeOfMeal).toHaveBeenCalledWith(typeOfMeal, { data: 'any_data', id })
    expect(spyTypeOfMeal).toHaveBeenCalledTimes(1)
  })

  it('should call TypeOfMealAccountRepo.findByIdAndUpdate with correct params', async () => {
    await sut({ data: 'any_data', id })

    expect(typeOfMealAccountRepo.findByIdAndUpdate).toHaveBeenCalledWith(id, mockUpdatedTypeOfMeal)
    expect(typeOfMealAccountRepo.findByIdAndUpdate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if TypeOfMealAccountRepo.findByIdAndUpdate throws', async () => {
    typeOfMealAccountRepo.findByIdAndUpdate.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ data: 'any_data', id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return an updated typeOfMeal on success', async () => {
    mockUpdatedTypeOfMeal.name = 'New Name'
    typeOfMealAccountRepo.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedTypeOfMeal)

    const typeOfMealFindByIdResult = await sut({ name: 'New Name', id })

    expect(typeOfMealFindByIdResult).toEqual(mockUpdatedTypeOfMeal)
  })
})
