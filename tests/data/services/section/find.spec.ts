import { FindSections, FindSectionsService } from '@/domain/use-cases'
import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { setupFindSections } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/data/entities/section')

describe('FindSectionsService', () => {
  let sectionFindInputs: FindSections.Input
  let sectionAccountRepo: MockProxy<SectionDbRepo>
  let sut: FindSectionsService

  beforeAll(() => {
    sectionFindInputs = {
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    sectionAccountRepo = mock()
    sectionAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
  })

  beforeEach(() => {
    sut = setupFindSections(sectionAccountRepo)
  })

  it('should call SectionAccountRepo.find with correct params', async () => {
    await sut(sectionFindInputs)

    expect(sectionAccountRepo.find).toHaveBeenCalledWith(sectionFindInputs)
    expect(sectionAccountRepo.find).toHaveBeenCalledTimes(1)
  })

  it('should return an object with items and data properties on success', async () => {
    const sectionFindResult = await sut({})

    expect(sectionFindResult).toEqual({ items: 0, data: [] })
  })

  it('should rethrow if SectionAccountRepo.find throws', async () => {
    sectionAccountRepo.find.mockRejectedValueOnce(new Error('repo_error'))

    const promise = sut({})

    await expect(promise).rejects.toThrow(new Error('repo_error'))
  })
})
