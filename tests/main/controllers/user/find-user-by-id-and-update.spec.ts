import { FindUserByIdAndUpdateController } from '@/main/controllers'
import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindUserByIdAndUpdateController', () => {
  let id: string
  let accountId: string
  let user: UserData
  let findUserByIdAndUpdateService: jest.Mock
  let sut: FindUserByIdAndUpdateController

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
    findUserByIdAndUpdateService = jest.fn()
    findUserByIdAndUpdateService.mockResolvedValue(user)
  })

  beforeEach(() => {
    sut = new FindUserByIdAndUpdateController(findUserByIdAndUpdateService)
  })

  it('should call findUserByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findUserByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findUserByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findUserByIdAndUpdateService fails', async () => {
    findUserByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findUserByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: user
    })
  })
})
