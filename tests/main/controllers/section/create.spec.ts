import { UnauthorizedError } from '@/application/errors'
import { UnauthorizedError as ServiceError } from '@/data/errors'
import { CreateSection } from '@/domain/use-cases'
import { CreateSectionController } from '@/main/controllers'

describe('CreateSectionController', () => {
  let sectionData: CreateSection.Input
  let createSection: jest.Mock
  let sut: CreateSectionController

  beforeAll(() => {
    sectionData = {
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    createSection = jest.fn()
    createSection.mockResolvedValue({ id: 'section_id' })
  })

  beforeEach(() => {
    sut = new CreateSectionController(createSection)
  })

  it('should call createSection with correct params', async () => {
    await sut.handle(sectionData)

    expect(createSection).toHaveBeenCalledWith(sectionData)
    expect(createSection).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if createSection fails', async () => {
    createSection.mockRejectedValueOnce(new ServiceError('service_error'))

    const httpResponse = await sut.handle(sectionData)

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 201 if createSection succeeds', async () => {
    const httpResponse = await sut.handle(sectionData)

    expect(httpResponse).toEqual({
      statusCode: 201,
      data: {
        id: 'section_id'
      }
    })
  })
})
