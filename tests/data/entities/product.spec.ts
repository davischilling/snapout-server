import { Product } from '@/data/entities'
import { PortionTypes, ProductData } from '@/domain/models'

describe('Product', () => {
    let productData: ProductData
    let sut: Product

    beforeEach(() => {
        productData = {
            name: "Mock Product",
            fat: 2,
            carbohydrate: 2,
            protein: 2,
            portion: PortionTypes.grams,
            isConsumableAlone: true
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Product(productData)

        productData.fat = sut.fat

        expect(sut).toEqual(productData)
    })

    it('should update an product correctly', () => {
        sut = new Product(productData)
        sut.id = 'any_product_id'

        const updatedProduct = Product.update(sut, { fat: 3, portion: PortionTypes.unity })
        sut.fat = 3
        sut.portion = PortionTypes.unity

        expect(updatedProduct).toEqual(sut)
    })

})
