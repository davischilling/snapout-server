import { SectionData } from '@/domain/models'

export class Section {
  id?: string
  menuName: string
  entityName: string
  sectionTitle: string

  constructor (
    sectionData: SectionData
  ) {
    const {
      id,
      menuName,
      entityName,
      sectionTitle
    } = sectionData
    if (id !== undefined) {
      this.id = id
    }
    this.menuName = menuName
    this.entityName = entityName
    this.sectionTitle = sectionTitle
  }
}
