import { Repository as SectionDbRepo } from '@/data/contracts/repos'
import { Section } from '@/data/entities'
import { setupCreateSection } from '@/data/services'
import { CreateSection, CreateSectionService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/section')

describe('CreateSectionService', () => {
    let sectionAccountRepo: MockProxy<SectionDbRepo>
    const createSectionInput: CreateSection.SectionInputs = {
      menuName: 'any_menuName',
      entityName: 'any_entityName',
      sectionTitle: 'any_sectionTitle'
    }
    let sut: CreateSectionService

    beforeAll(() => {
        sectionAccountRepo = mock()
        sectionAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        sectionAccountRepo.create.mockResolvedValue('section_id')
    })

    beforeEach(() => {
        sut = setupCreateSection(sectionAccountRepo)
    })


    it('should call SectionRepo.create with Section entity', async () => {
        const SectionStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(Section).mockImplementation(SectionStub)

        await sut(createSectionInput)

        expect(sectionAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(sectionAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const sectionCreateResult = await sut(createSectionInput)

        expect(sectionCreateResult).toEqual({ id: 'section_id' })
    })

    it('should rethrow if SectionAccountRepo.create throws', async () => {
        sectionAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createSectionInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
