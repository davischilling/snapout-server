import { SectionData } from '@/domain/models'

export type FindSectionByIdAndUpdateService = (params: FindSectionByIdAndUpdate.Input) => Promise<FindSectionByIdAndUpdate.Output>

export namespace FindSectionByIdAndUpdate {
  export type Input = {
    id: string
    menuName: string
    entityName: string
    sectionTitle: string
  }
  export type Output = { section: SectionData } | Error
}
