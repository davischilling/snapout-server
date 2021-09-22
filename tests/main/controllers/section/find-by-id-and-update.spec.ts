import { FindSectionByIdAndUpdateController } from '@/main/controllers'
import { SectionData } from '@/domain/models'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { UnauthorizedError } from '@/application/errors'

import mongoose from 'mongoose'

describe('FindSectionByIdAndUpdateController', () => {
  let id: string
  let sectionData: SectionData
  let findSectionByIdAndUpdateService: jest.Mock
  let sut: FindSectionByIdAndUpdateController

  beforeAll(() => {
    id = new mongoose.Types.ObjectId().toHexString()
    sectionData = {
      id,
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    findSectionByIdAndUpdateService = jest.fn()
    findSectionByIdAndUpdateService.mockResolvedValue(sectionData)
  })

  beforeEach(() => {
    sut = new FindSectionByIdAndUpdateController(findSectionByIdAndUpdateService)
  })

  it('should call findSectionByIdAndUpdateService with correct params', async () => {
    await sut.handle({ params: { data: 'any_data', id } })

    expect(findSectionByIdAndUpdateService).toHaveBeenCalledWith({ params: { data: 'any_data', id } })
    expect(findSectionByIdAndUpdateService).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if findSectionByIdAndUpdateService fails', async () => {
    findSectionByIdAndUpdateService.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if findSectionByIdAndUpdateService succeeds', async () => {
    const httpResponse = await sut.handle({ params: { data: 'any_data', id } })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: sectionData
    })
  })
})
