import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { CreateUserController } from '@/main/controllers'

describe('CreateUserController', () => {
  let user: UserData
  let createUser: jest.Mock
  let sut: CreateUserController

  beforeAll(() => {
    user = {
      accountId: 'user_id',
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 67,
      physicalActivityLevel: PhysicalActivityLevelType.fourToFive
    }
    createUser = jest.fn()
    createUser.mockResolvedValue({ id: 'user_id' })
  })

  beforeEach(() => {
    sut = new CreateUserController(createUser)
  })

  it('should call createUser with correct params', async () => {
    await sut.handle(user)

    expect(createUser).toHaveBeenCalledWith(user)
    expect(createUser).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createUser fails', async () => {
    createUser.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(user)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createUser succeeds', async () => {
    const httpResponse = await sut.handle(user)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'user_id'
      }
    })
  })
})
