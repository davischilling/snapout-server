import { FindTypeOfMealByIdAndDeleteService } from '@/domain/use-cases/typeOfMeal'
import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { setupFindTypeOfMealByIdAndDelete } from '@/data/services'

import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/typeOfMeal')

describe('FindTypeOfMealByIdAndDeleteService', () => {
  let id: string
  let typeOfMealAccountRepo: MockProxy<TypeOfMealDbRepo>
  let sut: FindTypeOfMealByIdAndDeleteService

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    typeOfMealAccountRepo = mock()
    typeOfMealAccountRepo.findByIdAndDelete.mockResolvedValue(id)
  })

  beforeEach(() => {
    sut = setupFindTypeOfMealByIdAndDelete(typeOfMealAccountRepo)
  })

  it('should call TypeOfMealAccountRepo.findByIdAndDelete with correct params', async () => {
    await sut({ id })

    expect(typeOfMealAccountRepo.findByIdAndDelete).toHaveBeenCalledWith(id)
    expect(typeOfMealAccountRepo.findByIdAndDelete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if TypeOfMealAccountRepo.findByIdAndDelete throws', async () => {
    typeOfMealAccountRepo.findByIdAndDelete.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({ id })

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })

  it('should return the deleted typeOfMeal id on success', async () => {
    const typeOfMealFindByIdResult = await sut({ id })

    expect(typeOfMealFindByIdResult).toEqual({ id })
  })
})
