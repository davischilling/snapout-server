import { FindProductByIdController } from '@/main/controllers'
import { PortionTypes, ProductData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindProductByIdController', () => {
  let id: string
  let product: ProductData
  let findProductByIdService: jest.Mock
  let sut: FindProductByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    product = {
      id,
      name: "Mock Product",
      fat: 2,
      carbohydrate: 2,
      protein: 2,
      portion: PortionTypes.grams,
      isConsumableAlone: true
    }
    findProductByIdService = jest.fn()
    findProductByIdService.mockResolvedValue(product)
  })

  beforeEach(() => {
    sut = new FindProductByIdController(findProductByIdService)
  })

  it('should call findProductByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findProductByIdService).toHaveBeenCalledWith(id)
    expect(findProductByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findProductByIdService fails', async () => {
    findProductByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findProductByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: product
    })
  })
})
