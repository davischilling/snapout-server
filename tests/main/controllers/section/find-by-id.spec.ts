import { FindSectionByIdController } from '@/main/controllers'
import { SectionData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindSectionByIdController', () => {
  let id: string
  let sectionData: SectionData
  let findSectionByIdService: jest.Mock
  let sut: FindSectionByIdController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    sectionData = {
      id,
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    findSectionByIdService = jest.fn()
    findSectionByIdService.mockResolvedValue(sectionData)
  })

  beforeEach(() => {
    sut = new FindSectionByIdController(findSectionByIdService)
  })

  it('should call findSectionByIdService with correct params', async () => {
    await sut.handle(id)

    expect(findSectionByIdService).toHaveBeenCalledWith(id)
    expect(findSectionByIdService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findSectionByIdService fails', async () => {
    findSectionByIdService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findSectionByIdService succeeds', async () => {
    const httpResponse = await sut.handle(id)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: sectionData
    })
  })
})
