import { SectionData } from '@/domain/models'

export type FindSectionsService = (params: FindSections.Input) => Promise<FindSections.Output>

export namespace FindSections {
  export type Input = {
    menuName?: string
    entityName?: string
    sectionTitle?: string
  }
  export type Output = { items: number, data: SectionData[] } | Error
}
