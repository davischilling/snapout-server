import { FindUserByIdController } from '@/main/controllers'
import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindUserByIdController', () => {
  let id: string
  let accountId: string
  let user: UserData
  let findUserByIdService: jest.Mock
  let sut: FindUserByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    accountId = new mongoose.Types.ObjectId().toHexString()
    user = {
      id,
      accountId,
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 69,
      physicalActivityLevel: PhysicalActivityLevelType.fourToFive
    }
    findUserByIdService = jest.fn()
    findUserByIdService.mockResolvedValue(user)
  })

  beforeEach(() => {
    sut = new FindUserByIdController(findUserByIdService)
  })

  it('should call findUserByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findUserByIdService).toHaveBeenCalledWith(id)
    expect(findUserByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findUserByIdService fails', async () => {
    findUserByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findUserByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: user
    })
  })
})
