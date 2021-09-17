import { Repository as TypeOfMealDbRepo } from '@/data/contracts/repos'
import { TypeOfMeal } from '@/data/entities'
import { setupCreateTypeOfMeal } from '@/data/services'
import { CreateTypeOfMeal, CreateTypeOfMealService } from '@/domain/use-cases/typeOfMeal'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'


jest.mock('@/data/entities/typeOfMeal')

describe('CreateTypeOfMealService', () => {
    let typeOfMealAccountRepo: MockProxy<TypeOfMealDbRepo>
    const createTypeOfMealInput: CreateTypeOfMeal.TypeOfMealInputs = {
        name: "Mock Meal"
    }
    let sut: CreateTypeOfMealService

    beforeAll(() => {
        typeOfMealAccountRepo = mock()
        typeOfMealAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        typeOfMealAccountRepo.create.mockResolvedValue('typeOfMeal_id')
    })

    beforeEach(() => {
        sut = setupCreateTypeOfMeal(typeOfMealAccountRepo)
    })


    it('should call TypeOfMealRepo.create with TypeOfMeal entity', async () => {
        const TypeOfMealStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(TypeOfMeal).mockImplementation(TypeOfMealStub)

        await sut(createTypeOfMealInput)

        expect(typeOfMealAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(typeOfMealAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const typeOfMealCreateResult = await sut(createTypeOfMealInput)

        expect(typeOfMealCreateResult).toEqual({ id: 'typeOfMeal_id' })
    })

    it('should rethrow if TypeOfMealAccountRepo.create throws', async () => {
        typeOfMealAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createTypeOfMealInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
