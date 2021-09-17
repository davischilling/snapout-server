import { FindProductByIdAndUpdateController } from '@/main/controllers'
import { PortionTypes, ProductData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindProductByIdAndUpdateController', () => {
  let id: string
  let product: ProductData
  let findProductByIdAndUpdateService: jest.Mock
  let sut: FindProductByIdAndUpdateController

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
    findProductByIdAndUpdateService = jest.fn()
    findProductByIdAndUpdateService.mockResolvedValue(product)
  })

  beforeEach(() => {
    sut = new FindProductByIdAndUpdateController(findProductByIdAndUpdateService)
  })

  it('should call findProductByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findProductByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findProductByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findProductByIdAndUpdateService fails', async () => {
    findProductByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findProductByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: product
    })
  })
})
