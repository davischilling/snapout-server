import { Section } from '@/data/entities'
import { SectionData } from '@/domain/models'

describe('Section', () => {
    let sectionData: SectionData
    let sut: Section

    beforeEach(() => {
        sectionData = {
          menuName: 'any_menuName',
          entityName: 'any_entityName',
          sectionTitle: 'any_sectionTitle'
        }
    })

    it('should fill the attrs on the constructor with correct params', () => {
        sut = new Section(sectionData)

        expect(sut).toEqual(sectionData)
    })

    it('should update an section correctly', () => {
      sut = new Section(sectionData)
      sut.id = 'any_section_id'

      const updatedSection = new Section({ ...sut, ...{ sectionTitle: 'new_sectionTitle' }})

      expect(updatedSection).toEqual({
        id: 'any_section_id',
        menuName: 'any_menuName',
        entityName: 'any_entityName',
        sectionTitle: 'new_sectionTitle'
      })
  })
})
