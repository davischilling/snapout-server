import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { PortionTypes } from '@/domain/models'
import { CreateProductController } from '@/main/controllers'

type ProductInputs = {
  name: string
  fat: number
  carbohydrate: number
  protein: number
  portion: PortionTypes
  isConsumableAlone: boolean
}

describe('CreateProductController', () => {
  let productInputs: ProductInputs
  let createProduct: jest.Mock
  let sut: CreateProductController

  beforeAll(() => {
    productInputs = {
      name: "Mock Product",
      fat: 2,
      carbohydrate: 2,
      protein: 2,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
    createProduct = jest.fn()
    createProduct.mockResolvedValue({ id: 'product_id' })
  })

  beforeEach(() => {
    sut = new CreateProductController(createProduct)
  })

  it('should call createProduct with correct params', async () => {
    await sut.handle(productInputs)

    expect(createProduct).toHaveBeenCalledWith(productInputs)
    expect(createProduct).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createProduct fails', async () => {
    createProduct.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(productInputs)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createProduct succeeds', async () => {
    const httpResponse = await sut.handle(productInputs)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'product_id'
      }
    })
  })
})
