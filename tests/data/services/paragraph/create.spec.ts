import { Repository as ParagraphDbRepo } from '@/data/contracts/repos'
import { Paragraph } from '@/data/entities'
import { setupCreateParagraph } from '@/data/services'
import { CreateParagraph, CreateParagraphService } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/data/entities/paragraph')

describe('CreateParagraphService', () => {
    let paragraphAccountRepo: MockProxy<ParagraphDbRepo>
    const createParagraphInput: CreateParagraph.ParagraphInputs = {
      paragraph: 'any_paragraph'
    }
    let sut: CreateParagraphService

    beforeAll(() => {
        paragraphAccountRepo = mock()
        paragraphAccountRepo.find.mockResolvedValue({ items: 0, data: [] })
        paragraphAccountRepo.create.mockResolvedValue('paragraph_id')
    })

    beforeEach(() => {
        sut = setupCreateParagraph(paragraphAccountRepo)
    })


    it('should call ParagraphRepo.create with Paragraph entity', async () => {
        const ParagraphStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
        mocked(Paragraph).mockImplementation(ParagraphStub)

        await sut(createParagraphInput)

        expect(paragraphAccountRepo.create).toHaveBeenCalledWith({ any: 'any' })
        expect(paragraphAccountRepo.create).toHaveBeenCalledTimes(1)
    })

    it('should return an id on success', async () => {
        const paragraphCreateResult = await sut(createParagraphInput)

        expect(paragraphCreateResult).toEqual({ id: 'paragraph_id' })
    })

    it('should rethrow if ParagraphAccountRepo.create throws', async () => {
        paragraphAccountRepo.create.mockRejectedValueOnce(new Error('repo_error'))

        const promise = sut(createParagraphInput)

        await expect(promise).rejects.toThrow(new Error('repo_error'))
    })
})
