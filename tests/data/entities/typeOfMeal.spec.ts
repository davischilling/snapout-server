import { TypeOfMeal } from '@/data/entities'
import { TypeOfMealData } from '@/domain/models'

describe('TypeOfMeal', () => {
    let typeOfMealData: TypeOfMealData
    let sut: TypeOfMeal

    beforeEach(() => {
        typeOfMealData = {
            name: "Mock Meal"
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new TypeOfMeal(typeOfMealData)

        typeOfMealData.name = sut.name

        expect(sut).toEqual(typeOfMealData)
    })

    it('should update an typeOfMeal correctly', () => {
        sut = new TypeOfMeal(typeOfMealData)
        sut.id = 'any_typeOfMeal_id'

        const updatedTypeOfMeal = TypeOfMeal.update(sut, { name: 'New Name' })
        sut.name = 'New Name'

        expect(updatedTypeOfMeal).toEqual(sut)
    })

})
